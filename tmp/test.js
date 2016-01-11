/*eslint-disable no-console */
require('babel-register');
import cloneDeep from 'lodash/lang/cloneDeep';
import parseFriendlyPlayer from '../app/scripts/parse-friendly-player';
import {isMyHero, isHeroCard} from '../app/scripts/is-my-hero';
import findClass from '../app/scripts/find-class';
import hasWon from '../app/scripts/win-condition';

var LogWatcher = require('hearthstone-log-watcher');
var logWatcher = new LogWatcher();
var logMatch = [];
var dataStructure = {
  matchId: "",
  for: "",
  against: "",
  log: [],
  hasWon: ""
};
var database = [];

// { cardName: 'Rexxar',
//   entityId: 66,
//   cardId: 'HERO_05',
//   playerId: 2,
//   fromTeam: undefined,
//   fromZone: undefined,
//   toTeam: 'FRIENDLY',
//   toZone: 'PLAY (Hero)',
//   id: 1452388407333 }

logWatcher.on('game-start', function (data) {
  console.log('Game started!');
  console.log('=======================');
  console.log(data);
  dataStructure.matchId = Date.now();
});

logWatcher.on('game-over', function (data) {
  console.log('Game ended!');
  console.log('=======================');
  console.log(data);
  recordOutcome(data, logMatch);
  // console.log(dataStructure);
  logMatch = [];
  dataStructure = {
    matchId: "",
    for: "",
    against: "",
    log: [],
    hasWon: ""
  };
  console.log(database);
});

logWatcher.on('zone-change', function (data) {
  if (isHeroCard(data)) {
    if (isMyHero(data)) {
      dataStructure.for = findClass(data.cardName);
    } else {
      dataStructure.against = findClass(data.cardName);
    }
  }
  data.id = Date.now();
  logMatch.push(data);
  // console.log(data);
  // console.log(data.cardName + ' has moved from ' + data.fromTeam + ' ' + data.fromZone + ' to ' + data.toTeam + ' ' + data.toZone);
});

logWatcher.start();


var recordOutcome = function (data, matchLog) {
  dataStructure.hasWon = hasWon(parseFriendlyPlayer(data));
  dataStructure.log = matchLog;
  database.push(cloneDeep(dataStructure));
};
