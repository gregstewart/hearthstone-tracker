import {cloneDeep} from 'lodash';
import {assoc, assocIn} from 'mori';
import {dataStructure, matchLog} from './data-structures';

export const recordOutcome = (database, dataStructure) => {
  database.push(cloneDeep(dataStructure));
  return database;
};

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
