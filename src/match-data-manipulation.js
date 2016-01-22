import cloneDeep from 'lodash/lang/cloneDeep';
import mori from 'mori';
import {dataStructure, matchLog} from './data-structures';

export const recordOutcome = (database, dataStructure) => {
  database.push(cloneDeep(dataStructure));
  return database;
};

export const resetData = () => {
  return [dataStructure, matchLog];
};

export const setMatchId = (dataStructure) => {
  return mori.assoc(dataStructure, "_id", Date.now().toString());
};

export const setStartTime = (dataStructure) => {
  return mori.assoc(dataStructure, "startTime", Date.now());
};

export const setEndTime = (dataStructure) => {
  return mori.assoc(dataStructure, "endTime", Date.now());
};

export const setWinCondition = (dataStructure, hasWon) => {
  return mori.assoc(dataStructure, "hasWon", hasWon);
};

export const setForPlayerId = (dataStructure, id) => {
  return mori.assocIn(dataStructure, ["for", "id"], id);
};

export const setAgainstPlayerId = (dataStructure, id) => {
  return mori.assocIn(dataStructure, ["against", "id"], id);
};

export const setForPlayerName = (dataStructure, name) => {
  return mori.assocIn(dataStructure, ["for", "name"], name);
};

export const setAgainstPlayerName = (dataStructure, name) => {
  return mori.assocIn(dataStructure, ["against", "name"], name);
};

export const setForClass = (dataStructure, value) => {
  return mori.assocIn(dataStructure, ["for", "class"], value);
};

export const setAgainstClass = (dataStructure, value) => {
  return mori.assocIn(dataStructure, ["against", "class"], value);
};

export const logMatchData = (dataStructure, logMatch) => {
  return mori.assoc(dataStructure, "log", logMatch);
};
