import mori from 'mori';
import Promise from 'bluebird';

const winsLosses = (n) => {
  return n === true ? "wins" : "losses";
};

const getElement = (element) => {
  return mori.getIn(element, ['doc', 'hasWon']);
};

export function summaryStats (data) {
  let promise = new Promise((resolve, reject) => {
    if(!data) {
      reject(new Error('Expected a result set'));
    }

    data = mori.toClj(data.rows);
    let results = mori.groupBy(winsLosses, mori.map(getElement, data));

    let wins = mori.count(mori.get(results, 'wins'));
    let losses = mori.count(mori.get(results, 'losses'));
    let ratio = wins/(wins+losses) * 100 + '%';
    resolve({
      wins,losses,ratio
    });
  });

  return promise;
}

export function transformSummaryStats (input) {
  const shape = mori.toClj([
    {id: 1, label: "Wins", text: ""},
    {id: 2, label: "Losses", text: ""},
    {id: 3, label: "Ratio", text: ""}
  ]);

  let output = mori.map((element) => {
    let keyToFind = mori.get(element, 'label').toLowerCase();
    let foundValue = mori.find(mori.toClj(input), keyToFind);
    return mori.assoc(element, 'text', mori.last(foundValue).toString());
  }, shape);

  return mori.toJs(output);
}
