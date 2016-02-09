import { assoc, count, find, get, getIn, groupBy, last, map, toClj, toJs } from 'mori';
import Promise from 'bluebird';

const winsLosses = (n) => {
  return n === true ? "wins" : "losses";
};

const getElement = (element) => {
  return getIn(element, ['doc', 'hasWon']);
};

export function summaryStats (data) {
  let promise = new Promise((resolve, reject) => {
    if(!data) {
      reject(new Error('Expected a result set'));
    }

    data = toClj(data.rows);
    let results = groupBy(winsLosses, map(getElement, data));

    let wins = count(get(results, 'wins'));
    let losses = count(get(results, 'losses'));
    let ratio = wins/(wins+losses) * 100 + '%';
    resolve(transformSummaryStats({
      wins,losses,ratio
    }));
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
