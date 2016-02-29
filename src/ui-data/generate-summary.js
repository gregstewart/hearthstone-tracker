import { summaryStats } from './stats';
import winston from 'winston';
import winStreak from '../win-streak';

export function generateSummary (db, wC) {
  return db.allDocs({include_docs: true})
    .then((result) => {
      return Promise.all([summaryStats(result), winStreak(result)]);
    })
    .then((results) => {
      wC.send('ping', {summaryStats: results[0], winStreak: results[1]});
    })
    .catch((error) => {
      winston.error(error);
    });
}
