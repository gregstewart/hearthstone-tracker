import { summaryStats } from './stats';
import debug from 'debug';
import winStreak from '../win-streak';

let log = {
  main: debug('HT:info'),
  error: debug('HT:error')
};

export function generateSummary (db, wC) {
  return db.allDocs({include_docs: true})
    .then((result) => {
      return Promise.all([summaryStats(result), winStreak(result)]);
    })
    .then((results) => {
      let payload = {summaryStats: results[0], winStreak: results[1]};
      log.main(payload)
      wC.send('ping', payload);
    })
    .catch((error) => {
      log.error(error);
    });
}
