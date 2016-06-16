import { formattedPercentage, transformSummaryStats } from '../ui-data/transformers';

import { datascript, mori } from 'datascript-mori';
const { core } = datascript;
const { first, hashMap, last, map, parse, repeat } = mori;

export function pluckStats (db) {
  const query = `[:find (count ?e) .
                  :in $ ?a
                  :where [?e ":hasWon" ?a]]`;
  const wins = core.q(parse(query), db, true);
  const losses = core.q(parse(query), db, false);
  const ratio = formattedPercentage(wins/(wins+losses));

  return {
    wins, losses, ratio
  };
}

export function summaryStats (db) {

  let promise = new Promise((resolve, reject) => {
    if(!db) {
      reject(new Error('Expected a result set'));
    }

    resolve(transformSummaryStats(pluckStats(db)));
  });

  return promise;
}

export function gameBreakdownDetails (data) {
  let promise = new Promise((resolve, reject) => {
    if(!data) {
      reject(new Error('Expected a result set'));
    }

    resolve([]);
  });

  return promise;
}

export function aggregateDetails (db, outcome) {
  const getClassAndCountByWinCondition = (db, outcome) => {
    const className = outcome ? ":for/class" : ":against/class";
    const query = `[:find (count ?e) ?class-name
                    :in $ ?a
                    :where [?e ":hasWon" ?a]
                    [?e "${className}" ?class-name]]`;

    return core.q(parse(query), db, outcome);
  };

  const getCount = (db) => {
    const query = `[:find (count ?e) .
                    :in $ ?a
                    :where [?e ":hasWon" ?a]]`;

    return core.q(parse(query), db, outcome);
  };

  const aggregateResults = (element, totalRows) => {
    const total = first(element);
    const percentageAsString = formattedPercentage(total/totalRows);

    return hashMap('class', last(element), 'total', total, 'percentage', percentageAsString);
  };

  const result = getClassAndCountByWinCondition(db, outcome);
  const total = getCount(db, outcome);

  return map(aggregateResults, result, repeat(total, total));
}
