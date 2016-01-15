// import LogWatcher from 'hearthstone-log-watcher';

import {setWinCondition, recordOutcome, setMatchId, setFor, setAgainst, setPlayerId} from './match-data-manipulation';
import {parseFriendlyPlayer, parseFriendlyPlayerById} from '../app/scripts/parse-friendly-player';
import {isMyHero, isHeroCard} from '../app/scripts/is-my-hero';
import findClass from '../app/scripts/find-class';
import hasWon from '../app/scripts/win-condition';

// TODO: case to be made whereby we turn the for and against values into object
// { playerName: 'foo', playerId: 1}
let dataStructure = {
  matchId: "",
  playerId: "",
  for: "",
  against: "",
  log: [],
  hasWon: ""
};
let database = [];

//TODO: should live somewhere else;
const setHeroValues = (data) => {
  if (isHeroCard(data)) {
    if (isMyHero(data)) {
      dataStructure = setFor(dataStructure, findClass(data.cardName));
    } else {
      dataStructure = setAgainst(dataStructure, findClass(data.cardName));
    }
    dataStructure = setPlayerId(dataStructure, data.playerId);
  }
  return dataStructure;
};

export function dataLogger (logWatcher) {

  logWatcher.on('game-start', () => {
    dataStructure = setMatchId(dataStructure);
  });

  logWatcher.on('game-over', (data) => {
    var winCondition;
    if(!dataStructure.matchId) {
      dataStructure = setMatchId(dataStructure);
      winCondition = hasWon(parseFriendlyPlayerById(data, dataStructure.playerId));
    } else {
      winCondition = hasWon(parseFriendlyPlayer(data));
    }
    dataStructure = setWinCondition(dataStructure, winCondition);
    database = recordOutcome(database, dataStructure);
    // let { logMatch, dataStructure } = resetData();
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
