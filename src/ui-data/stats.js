import { assoc, count, find, get, getIn, groupBy, last, map, toClj, toJs } from 'mori';
import Promise from 'bluebird';

const winsLosses = (n) => {
  return n === true ? "wins" : "losses";
};

const getElement = (element) => {
  return getIn(element, ['doc', 'hasWon']);
};

export function pluckStats (rows) {
  let results = groupBy(winsLosses, map(getElement, rows));

  let wins = count(get(results, 'wins'));
  let losses = count(get(results, 'losses'));
  let ratio = wins/(wins+losses) * 100 + '%';

  return {
    wins,losses,ratio
  };
};

export function summaryStats (data) {
  let promise = new Promise((resolve, reject) => {
    if(!data) {
      reject(new Error('Expected a result set'));
    }

    resolve(transformSummaryStats(pluckStats(toClj(data.rows))));
  });

  return promise;
}

export function transformSummaryStats (input) {
  const shape = toClj([
    {id: 1, label: "Wins", text: ""},
    {id: 2, label: "Losses", text: ""},
    {id: 3, label: "Ratio", text: ""}
  ]);

  let output = map((element) => {
    let keyToFind = get(element, 'label').toLowerCase();
    let foundValue = find(toClj(input), keyToFind);
    return assoc(element, 'text', last(foundValue).toString());
  }, shape);

  return toJs(output);
}
