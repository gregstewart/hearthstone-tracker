import { assoc, count, find, get, getIn, groupBy, hashMap, last, map, nth, partitionBy, repeat, toClj, toJs } from 'mori';
import { statsShape } from '../constants';

const winsLosses = (n) => {
  return n === true ? "wins" : "losses";
};

const formattedPercentage = (val) => {
  return val * 100 + '%';
};

const getHasWon = (element) => {
  return getIn(element, ['doc', 'hasWon']);
};

const getClassName = (element, key) => {
  return getIn(element, ['doc', key, 'class']);
};

export function aggregateDetails (rows, key) {
  const aggregateResults = (element, totalRows, key) => {
    const total = count(element);
    const percentageAsString = formattedPercentage(total/totalRows);

    return hashMap('class', getClassName(nth(element, 0), key), 'value', total, 'percentage', percentageAsString);
  };

  const partitionByClassName = (rows, key) => {
    return partitionBy((row) => {
      return getClassName(row, key);
    }, rows);
  };

  const totalVector = repeat(count(rows), count(rows));
  const keysVector = repeat(count(rows), key);
  return map(aggregateResults, partitionByClassName(rows, key), totalVector, keysVector);
}

export function pluckStats (rows) {
  let results = groupBy(winsLosses, map(getHasWon, rows));

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
