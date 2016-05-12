import { summaryStats, gameBreakdownDetails } from './stats';
import winston from 'winston';
import winStreak from '../win-streak';
import { map, toClj, updateIn, vector } from 'mori';

const stripLog = (row) => {
  return updateIn(row, ['doc', 'log'], () => { return vector(); });
};

export function generateSummary (db, wC) {
  return db.allDocs({include_docs: true})
    .then((result) => {
      const reducedSet = map(stripLog, toClj(result.rows));
      return Promise.all([summaryStats(reducedSet), winStreak(reducedSet), gameBreakdownDetails(reducedSet)]);
    })
    .then((results) => {
      wC.send('ping', {summaryStats: results[0], winStreak: results[1], matchBreakdown: results[2]});
    })
    .catch((error) => {
      winston.error(error);
    });
}
