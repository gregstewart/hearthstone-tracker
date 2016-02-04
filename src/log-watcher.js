import {setWinCondition, setMatchId, setForPlayerId, setAgainstPlayerId, setForClass,
  setAgainstClass, setForPlayerName, setAgainstPlayerName, resetData, setStartTime, setEndTime} from './match-data-manipulation';
import {parseFriendlyPlayer, parsePlayerById, extractPlayerName} from './parse-friendly-player';
import {isMyHero, isHeroCard} from './is-my-hero';
import findClass from './find-class';
import hasWon from './win-condition';

import {assoc, conj, first, get, getIn, toClj, toJs, vector} from 'mori';

import debug from 'debug';

// TODO: case to be made whereby we turn the for and against values into object
// { playerName: 'foo', playerId: 1}
let dataStructure = toClj({
  _id: '',
  startTime: '',
  endTime: '',
  for: {
    name: '',
    id: '',
    class: ''
  },
  against: {
    name: '',
    id: '',
    class: ''
  },
  log: [],
  hasWon: ''
});
let matchLog = vector();

// Define some debug logging functions for easy and readable debug messages.
let log = {
  main: debug('HT:LV')
};

//TODO: should live somewhere else;
const setHeroValues = (data) => {
  //TODO: write a test to cover the issue resolved in commit 8fcc506
  if (isHeroCard(data)) {
    if (isMyHero(data)) {
      dataStructure = setForClass(dataStructure, findClass(data.cardName));
      dataStructure = setForPlayerId(dataStructure, data.playerId);
    } else {
      dataStructure = setAgainstClass(dataStructure, findClass(data.cardName));
      dataStructure = setAgainstPlayerId(dataStructure, data.playerId);
    }
  }
  return dataStructure;
};

//TODO: write a test to cover this
const fixStartTime = (dataStructure) => {
  return assoc(dataStructure, 'startTime', get(first(get(dataStructure, 'log')), 'id'));
};

export function dataLogger (logWatcher, db) {

  logWatcher.on('game-start', () => {
    dataStructure = setMatchId(dataStructure);
    dataStructure = setStartTime(dataStructure);
    log.main('game start: %s', get(dataStructure, '_id'));
  });

  logWatcher.on('game-over', (data) => {
    var winCondition;
    dataStructure = assoc(dataStructure, 'log', matchLog);

    if(!get(dataStructure, '_id')) {
      log.main('no game start event');
      log.main(parsePlayerById(data, getIn(dataStructure, ['for', 'id'])));
      log.main(hasWon(parsePlayerById(data, getIn(dataStructure, ['for', 'id']))));
      dataStructure = setMatchId(dataStructure);
      dataStructure = fixStartTime(dataStructure);
      winCondition = hasWon(parsePlayerById(data, getIn(dataStructure, ['for', 'id'])));
    } else {
      log.main('game started event');
      log.main(parseFriendlyPlayer(data));
      log.main(hasWon(parseFriendlyPlayer(data)));
      winCondition = hasWon(parseFriendlyPlayer(data));
    }
    dataStructure = setWinCondition(dataStructure, winCondition);
    dataStructure = setForPlayerName(dataStructure, extractPlayerName(data, getIn(dataStructure, ['for', 'id'])));
    dataStructure = setAgainstPlayerName(dataStructure, extractPlayerName(data, getIn(dataStructure, ['against', 'id'])));
    dataStructure = setEndTime(dataStructure);

    db.put(toJs(dataStructure))
      .then(() => {
        [dataStructure, matchLog] = resetData();
      }).catch((error) => {
        log.main(error);
      });
  });

  logWatcher.on('zone-change', (data) => {
    dataStructure = setHeroValues(data);
    data.id = Date.now();
    matchLog = conj(matchLog, toClj(data));
  });

  return logWatcher;
}
