import { mori } from 'datascript-mori';
import { transformSummaryStats, formattedPercentage } from './transformers';
import { byWinCondition } from './filters';
import { highestToLowest } from './sort';

const { count, get, getIn, groupBy, hashMap, map, nth, repeat, sort, toJs } = mori;

const winsLosses = (n) => {
  return n === true ? "wins" : "losses";
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

  const getClassResults = (classGrouping) => {
    return nth(classGrouping, 1); // 1 is the position of grouped results for that class in the vector
  };

  const sorted = groupBy((row) => {
    return getClassName(row, key);
  }, rows);

  const totalVector = repeat(count(rows), count(rows));
  const keysVector = repeat(count(rows), key);

  return map(aggregateResults, map(getClassResults, sorted), totalVector, keysVector);
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
  return [
    {
      status: 'wins',
      outcomes: toJs(sort(highestToLowest, aggregateDetails(byWinCondition(rows, true), 'for')))
    },
    {
      status: 'losses',
      outcomes: toJs(sort(highestToLowest, aggregateDetails(byWinCondition(rows, false), 'against')))
    }
  ];
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
