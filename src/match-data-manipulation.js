import { mori } from 'datascript-mori';
import { dataStructure, matchLog } from './data-structures';
import { isMyHero, isHeroCard } from './is-my-hero';
import findClass from './find-class';

const { assoc, assocIn } = mori;

export const resetData = () => {
  return [dataStructure, matchLog];
};

export const setMatchId = (dataStructure) => {
  return assoc(dataStructure, "_id", Date.now().toString());
};

export const setStartTime = (dataStructure) => {
  return assoc(dataStructure, "startTime", Date.now());
};

export const setEndTime = (dataStructure) => {
  return assoc(dataStructure, "endTime", Date.now());
};

export const setWinCondition = (dataStructure, hasWon) => {
  return assoc(dataStructure, "hasWon", hasWon);
};

export const setForPlayerId = (dataStructure, id) => {
  return assocIn(dataStructure, ["for", "id"], id);
};

export const setAgainstPlayerId = (dataStructure, id) => {
  return assocIn(dataStructure, ["against", "id"], id);
};

export const setForPlayerName = (dataStructure, name) => {
  return assocIn(dataStructure, ["for", "name"], name);
};

export const setAgainstPlayerName = (dataStructure, name) => {
  return assocIn(dataStructure, ["against", "name"], name);
};

export const setForClass = (dataStructure, value) => {
  return assocIn(dataStructure, ["for", "class"], value);
};

export const setAgainstClass = (dataStructure, value) => {
  return assocIn(dataStructure, ["against", "class"], value);
};

export const logMatchData = (dataStructure, logMatch) => {
  return assoc(dataStructure, "log", logMatch);
};

export const setHeroValues = (dataStructure, data) => {
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
