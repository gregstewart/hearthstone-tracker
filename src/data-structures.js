import {toClj, vector} from 'mori';

export const dataStructure = toClj({
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

export const matchLog = vector();
