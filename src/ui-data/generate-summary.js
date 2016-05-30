import { summaryStats, gameBreakdownDetails } from './stats';
import winston from 'winston';
import winStreak from '../win-streak';
import { mori } from 'datascript-mori';

const { map, toClj, updateIn, vector } = mori;

const stripLog = (row) => {
  return updateIn(row, ['doc', 'log'], () => { return vector(); });
};

export function generateSummary (result, wC) {
  const reducedSet = map(stripLog, toClj(result.rows));
  return Promise.all([summaryStats(reducedSet), winStreak(reducedSet), gameBreakdownDetails(reducedSet)])
    .then((results) => {
      wC.send('ping', {summaryStats: results[0], winStreak: results[1], matchBreakdown: results[2]});
    })
    .catch((error) => {
      winston.error(error);
    });
}
