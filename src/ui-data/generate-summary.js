import { summaryStats, transformSummaryStats } from './stats';
import debug from 'debug';

let log = {
  error: debug('HT:error')
};

export function generateSummary (db, wC) {
  return db.allDocs({include_docs: true})
    .then(summaryStats)
    .then((payload) => {
      wC.send('ping', transformSummaryStats(payload));
    })
    .catch((error) => {
      log.error(error);
    });
}
