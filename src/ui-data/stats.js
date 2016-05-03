import { assoc, count, filter, find, get, getIn, groupBy, hashMap, last, map, nth, partitionBy, repeat, toClj, toJs } from 'mori';
import { statsShape } from '../constants';

const winsLosses = (n) => {
  return n === true ? "wins" : "losses";
};

const getElement = (element) => {
  return getIn(element, ['doc', 'hasWon']);
};

const formattedPercentage = (val) => {
  return val * 100 + '%';
};

export function winDetails (rows) {
  const filterWinners = (row) => {
    const result = get(row, 'doc');
    if (get(result, 'hasWon')) {
      return result;
    }
  };

  const getClassName = (element) => {
    return getIn(element, ['doc', 'for', 'class']);
  };

  const aggregateResults = (element, totalWinners) => {
    const total = count(element);
    const percentageAsString = formattedPercentage(total/totalWinners);

    return hashMap('class', getClassName(nth(element, 0)), 'value', total, 'percentage', percentageAsString);
  };

  const winners = filter(filterWinners, toClj(rows));
  const totalWinners = repeat(count(winners), count(winners));
  return map(aggregateResults, partitionBy(getClassName, winners), totalWinners);
}

export function pluckStats (rows) {
  let results = groupBy(winsLosses, map(getElement, rows));

  let wins = count(get(results, 'wins'));
  let losses = count(get(results, 'losses'));
  let ratio = formattedPercentage(wins/(wins+losses));

  return {
    wins,losses,ratio
  };
}

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
  const shape = toClj(statsShape);

  let output = map((element) => {
    let keyToFind = get(element, 'label').toLowerCase();
    let foundValue = find(toClj(input), keyToFind);
    return assoc(element, 'text', last(foundValue).toString());
  }, shape);

  return toJs(output);
}
