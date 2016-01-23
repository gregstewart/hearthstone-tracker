import mori from 'mori';

export const dataStructure = mori.toClj({
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

export const matchLog = mori.vector();
