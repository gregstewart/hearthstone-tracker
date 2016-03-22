import { dataLogger } from '../log-watcher';

export function startLogWatcher (watcher, db, winston) {
  let logWatcher = dataLogger(watcher, db, winston);
  logWatcher.start();
  return logWatcher;
}

export function setUpLogWatcher (LogWatcher) {
  return new Promise((resolve, reject) => {
    try {
      let watcher = new LogWatcher();
      return resolve(watcher);
    } catch (exception) {
      return reject(exception);
    }
  });
}
