import { summaryStats } from './stats';
import debug from 'debug';

let log = {
  error: debug('HT:error')
};

export function generateSummary (db, wC) {
  return db.allDocs({include_docs: true})
    .then(summaryStats)
    .then((payload) => {
      wC.send('ping', payload);
    })
    .catch((error) => {
      log.error(error);
    });
}
