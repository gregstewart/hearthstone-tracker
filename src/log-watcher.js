// import LogWatcher from 'hearthstone-log-watcher';

import {setWinCondition, setMatchId, setFor, setAgainst, setPlayerId, resetData, setStartTime, setEndTime} from './match-data-manipulation';
import {parseFriendlyPlayer, parseFriendlyPlayerById} from './parse-friendly-player';
import {isMyHero, isHeroCard} from './is-my-hero';
import findClass from './find-class';
import hasWon from './win-condition';

import debug from 'debug';

// TODO: case to be made whereby we turn the for and against values into object
// { playerName: 'foo', playerId: 1}
let dataStructure = {
  _id: "",
  playerId: "",
  startTime: "",
  endTime: "",
  for: "",
  against: "",
  log: [],
  hasWon: ""
};
let database = [];

// Define some debug logging functions for easy and readable debug messages.
let log = {
  main: debug('HT:LV')
};


//TODO: should live somewhere else;
const setHeroValues = (data) => {
  //TODO: write a test to cover the issue resolved in commit 8fcc506
  if (isHeroCard(data)) {
    if (isMyHero(data)) {
      dataStructure = setFor(dataStructure, findClass(data.cardName));
      dataStructure = setPlayerId(dataStructure, data.playerId);
    } else {
      dataStructure = setAgainst(dataStructure, findClass(data.cardName));
    }
  }
  return dataStructure;
};

const fixStartTime = (dataStructure) => {
  dataStructure.startTime = dataStructure.log[0].id;

  return dataStructure;
}

export function dataLogger (logWatcher, db) {

  logWatcher.on('game-start', () => {
    dataStructure = setMatchId(dataStructure);
    dataStructure = setStartTime(dataStructure);
    log.main('game start: %s', dataStructure._id);
  });

  logWatcher.on('game-over', (data) => {
    var winCondition;
    if(!dataStructure._id) {
      log.main('no game start event');
      log.main(data);
      log.main(parseFriendlyPlayerById(data, dataStructure.playerId));
      log.main(hasWon(parseFriendlyPlayerById(data, dataStructure.playerId)));
      dataStructure = setMatchId(dataStructure);
      dataStructure = fixStartTime(dataStructure);
      winCondition = hasWon(parseFriendlyPlayerById(data, dataStructure.playerId));
    } else {
      log.main('game started event');
      log.main(parseFriendlyPlayer(data));
      log.main(hasWon(parseFriendlyPlayer(data)));
      winCondition = hasWon(parseFriendlyPlayer(data));
    }
    dataStructure = setWinCondition(dataStructure, winCondition);
    dataStructure = setEndTime(dataStructure);
    log.main(dataStructure);
    db.put(dataStructure)
      .then(() => {
        // TODO: switch to immutable data and renable this
        dataStructure = resetData();
      }).catch((error) => {
        log.main(error);
      });
  });

  logWatcher.on('zone-change', (data) => {
    dataStructure = setHeroValues(data);
    data.id = Date.now();
    dataStructure.log.push(data);
  });

  return logWatcher;
}

export function getDatabase () {
  return database;
}
