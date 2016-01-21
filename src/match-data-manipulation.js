import cloneDeep from 'lodash/lang/cloneDeep';

export const recordOutcome = (database, dataStructure) => {
  database.push(cloneDeep(dataStructure));
  return database;
};

export const resetData = () => {
  // TODO: case to be made whereby we turn the for and against values into object
  // { playerName: 'foo', playerId: 1}
  const dataStructure = {
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
  };

  return dataStructure;
};

export const setMatchId = (dataStructure) => {
  dataStructure._id = Date.now().toString();
  return dataStructure;
};

export const setStartTime = (dataStructure) => {
  dataStructure.startTime = Date.now();
  return dataStructure;
};

export const setEndTime = (dataStructure) => {
  dataStructure.endTime = Date.now();
  return dataStructure;
};

export const setWinCondition = (dataStructure, hasWon) => {
  dataStructure.hasWon = hasWon;
  return dataStructure;
};

export const setForPlayerId = (dataStructure, id) => {
  dataStructure.for.id = id;
  return dataStructure;
};

export const setAgainstPlayerId = (dataStructure, id) => {
  dataStructure.against.id = id;
  return dataStructure;
};

export const setForPlayerName = (dataStructure, name) => {
  dataStructure.for.name = name;
  return dataStructure;
};

export const setAgainstPlayerName = (dataStructure, name) => {
  dataStructure.against.name = name;
  return dataStructure;
};

export const setForClass = (dataStructure, value) => {
  dataStructure.for.class = value;
  return dataStructure;
};

export const setAgainstClass = (dataStructure, value) => {
  dataStructure.against.class = value;
  return dataStructure;
};

export const logMatchData = (dataStructure, logMatch) => {
  dataStructure.log = logMatch;
  return dataStructure;
};
