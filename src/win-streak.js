import { mori } from 'datascript-mori';

const { count, getIn, hashMap, map, reverse, take } = mori;

const extractData = (element) => {
  const getWin = ['doc', 'hasWon'];
  const getAs = ['doc', 'for', 'class'];
  const getAgainst = ['doc', 'against', 'class'];
  return hashMap('result', getIn(element, getWin) ? 'win' : 'loss',
    'as', getIn(element, getAs),
    'against', getIn(element, getAgainst));
};

export const winStreak = (data) => {
  return new Promise((resolve, reject) => {
    if(!data) {
      reject(new Error('Expected a result set'));
    }
    if(!count(data)) {
      resolve([]);
    }

    resolve(map(extractData, take(5, reverse(data))));
  });
};
