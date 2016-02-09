import { summaryStats, transformSummaryStats } from './src/ui-data/stats';
import debug from 'debug';

let log = {
  error: debug('HT:error')
};
// TODO: write test
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
