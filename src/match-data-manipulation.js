import cloneDeep from 'lodash/lang/cloneDeep';

export const recordOutcome = (database, dataStructure) => {
  database.push(cloneDeep(dataStructure));
  return database;
};

export const resetData = () => {
  const logMatch = [];
  // TODO: case to be made whereby we turn the for and against values into object
  // { playerName: 'foo', playerId: 1}
  const dataStructure = {
    matchId: "",
    playerId: "",
    for: "",
    against: "",
    log: [],
    hasWon: ""
  };

  return { logMatch, dataStructure };
};

export const setMatchId = (dataStructure) => {
  dataStructure.matchId = Date.now();
  return dataStructure;
};

export const setWinCondition = (dataStructure, hasWon) => {
  dataStructure.hasWon = hasWon;
  return dataStructure;
};

export const setPlayerId = (dataStructure, id) => {
  dataStructure.playerId = id;
  return dataStructure;
};

export const logMatchData = (dataStructure, logMatch) => {
  dataStructure.log = logMatch;
  return dataStructure;
};

export const setFor = (dataStructure, value) => {
  dataStructure.for = value;
  return dataStructure;
};

export const setAgainst = (dataStructure, value) => {
  dataStructure.against = value;
  return dataStructure;
};
