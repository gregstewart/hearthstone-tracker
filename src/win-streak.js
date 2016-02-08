import mori from 'mori';

const extractData = (element) => {
  const getWin = ['doc', 'hasWon'];
  const getAs = ['doc', 'for', 'class'];
  const getAgainst = ['doc', 'against', 'class'];
  return mori.hashMap('result', mori.getIn(element, getWin) ? 'win' : 'loss',
    'as', mori.getIn(element, getAs),
    'against', mori.getIn(element, getAgainst));
};

export default function (data) {
  data = mori.toClj(data.rows);
  let subset = mori.subvec(data, 0, 5);

  return mori.toJs(mori.map(extractData, subset));
}
