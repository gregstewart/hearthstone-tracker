import cloneDeep from 'lodash/lang/cloneDeep';

export const recordOutcome = (database, dataStructure) => {
  database.push(cloneDeep(dataStructure));
  return database;
};

export const resetData = () => {
  // TODO: case to be made whereby we turn the for and against values into object
  // { playerName: 'foo', playerId: 1}
  const dataStructure = {
    _id: "",
    playerId: "",
    for: "",
    against: "",
    log: [],
    hasWon: ""
  };

  return dataStructure;
};

export const setMatchId = (dataStructure) => {
  dataStructure._id = Date.now().toString();
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
