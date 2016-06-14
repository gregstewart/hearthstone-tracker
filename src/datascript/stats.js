import { formattedPercentage, transformSummaryStats } from '../ui-data/transformers';

import { mori, datascript } from 'datascript-mori';
const { core } = datascript;
const { parse } = mori;

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
