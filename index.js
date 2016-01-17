import app from 'app';
import BrowserWindow from 'browser-window';
import LogWatcher from 'hearthstone-log-watcher';
import PouchDBWithLevelDB from 'pouchdb';

import {dataLogger} from './src/log-watcher';

import debug from 'debug';

let mainWindow = null;
// Define some debug logging functions for easy and readable debug messages.
let log = {
  main: debug('HT')
};


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  let db = new PouchDBWithLevelDB('hearthstone-tracker-leveldb');
  db.info().then(function (info) {
    debug(info);
  });

  let changes = db.changes({
    since: 'now',
    live: true,
    include_docs: true
  }).on('change', (change) => {
    log.main(change);
  }).on('complete', (info) => {
    log.main(info);
  }).on('error', (err) => {
    log.main(err);
  });

  let watcher = new LogWatcher();
  let logWatcher = dataLogger(watcher, db);
  logWatcher.start();
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800
  });

  mainWindow.loadURL('file://' + __dirname + '/app/index.html');

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    logWatcher.stop();
    changes.cancel();
  });
});
