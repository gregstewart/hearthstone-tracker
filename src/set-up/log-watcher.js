import { dataLogger } from '../log-watcher';
import LogWatcher from 'hearthstone-log-watcher';

export function startLogWatcher (watcher, db) {
  let logWatcher = dataLogger(watcher, db);
  logWatcher.start();
  return logWatcher;
}

export function setUpLogWatcher () {
  return new Promise((resolve, reject) => {
    try {
      let watcher = new LogWatcher();
      return resolve(watcher);
    } catch (exception) {
      return reject(exception);
    }
  });
}
