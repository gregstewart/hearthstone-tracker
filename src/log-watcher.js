import LogWatcher from 'hearthstone-log-watcher';

import { setWinCondition, logMatchData, recordOutcome, resetData, setMatchId, setFor, setAgainst } from './match-data-manipulation';
import parseFriendlyPlayer from '../app/scripts/parse-friendly-player';
import {isMyHero, isHeroCard} from '../app/scripts/is-my-hero';
import findClass from '../app/scripts/find-class';
import hasWon from '../app/scripts/win-condition';

let logMatch = [];
let dataStructure = {
  matchId: "",
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
  }
  return dataStructure;
};

const logWatcher = new LogWatcher();

logWatcher.on('game-start', () => {
  dataStructure = setMatchId(dataStructure);
});

logWatcher.on('game-over', (data) => {
  dataStructure = setWinCondition(dataStructure, hasWon(parseFriendlyPlayer(data)));
  dataStructure = logMatchData(dataStructure, logMatch);
  database = recordOutcome(database, dataStructure);
  let { logMatch, dataStructure } = resetData();
});

logWatcher.on('zone-change', (data) => {
  dataStructure = setHeroValues(data);
  data.id = Date.now();
  logMatch.push(data);
});

logWatcher.start();
