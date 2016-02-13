import { getIn, hashMap, map, reverse, subvec, toClj, toJs } from 'mori';

const extractData = (element) => {
  const getWin = ['doc', 'hasWon'];
  const getAs = ['doc', 'for', 'class'];
  const getAgainst = ['doc', 'against', 'class'];
  return hashMap('result', getIn(element, getWin) ? 'win' : 'loss',
    'as', getIn(element, getAs),
    'against', getIn(element, getAgainst));
};

export default function (data) {
  return new Promise((resolve, reject) => {
    if(!data) {
      reject(new Error('Expected a result set'));
    }

    if(!data.rows.length) {
      resolve([]);
    }
    resolve(toJs(reverse(map(extractData, subvec(toClj(data.rows), data.rows.length-5, data.rows.length)))));
  });
}
