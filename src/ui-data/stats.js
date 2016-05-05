import { count, get, getIn, groupBy, hashMap, map, nth, partitionBy, repeat, toClj, toJs } from 'mori';
import { transformSummaryStats } from './transformers';
import { byWinCondition } from './filters';

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

    return hashMap('class', getClassName(nth(element, 0), key), 'total', total, 'percentage', percentageAsString);
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

export function summaryStats (rows) {
  let promise = new Promise((resolve, reject) => {
    if(!rows) {
      reject(new Error('Expected a result set'));
    }

    resolve(transformSummaryStats(pluckStats(rows)));
  });

  return promise;
}

export function aggregate (rows) {
  const wins = toJs(aggregateDetails(byWinCondition(rows, true), 'for'));
  const losses = toJs(aggregateDetails(byWinCondition(rows, false), 'against'));

  return {
    wins, losses
  };
}

export function gameBreakdownDetails (data) {
  let promise = new Promise((resolve, reject) => {
    if(!data) {
      reject(new Error('Expected a result set'));
    }

    resolve(aggregate(data));
  });

  return promise;
}
