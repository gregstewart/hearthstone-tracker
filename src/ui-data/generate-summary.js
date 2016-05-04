import { summaryStats, gameBreakdownDetails } from './stats';
import winston from 'winston';
import winStreak from '../win-streak';

export function generateSummary (db, wC) {
  return db.allDocs({include_docs: true})
    .then((result) => {
      return Promise.all([summaryStats(result), winStreak(result), gameBreakdownDetails(result)]);
    })
    .then((results) => {
      wC.send('ping', {summaryStats: results[0], winStreak: results[1], matchBreakdown: results[2]});
    })
    .catch((error) => {
      winston.error(error);
    });
}
