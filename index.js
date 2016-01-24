import app from 'app';
import BrowserWindow from 'browser-window';
import LogWatcher from 'hearthstone-log-watcher';
import PouchDB from 'pouchdb';

import {dataLogger} from './src/log-watcher';
import {summaryStats, transformSummaryStats} from './src/ui-data/stats';

import debug from 'debug';
// Define some debug logging functions for easy and readable debug messages.
let log = {
  change: debug('HT:change'),
  complete: debug('HT:complete'),
  error: debug('HT:error')
};

const generateSummary = (db, wC) => {
  return db.allDocs({include_docs: true})
    .then(summaryStats)
    .then((payload) => {
      wC.send('ping', transformSummaryStats(payload));
    })
    .catch((error) => {
      log.error(error);
    });
};

let mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  let db = new PouchDB('hearthstone-tracker-leveldb', {adapter : 'leveldb'});

  let watcher = new LogWatcher();
  let logWatcher = dataLogger(watcher, db);
  logWatcher.start();
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800
  });

  mainWindow.loadURL('file://' + __dirname + '/app/index.html');
  let webContents = mainWindow.webContents;

  generateSummary(db, webContents);

  let changes = db.changes({
    since: 'now',
    live: true,
    include_docs: true
  }).on('change', (change) => {
    log.change(change);
    return generateSummary(db, webContents);
  }).on('complete', (info) => {
    log.complete(info);
  }).on('error', (error) => {
    log.error(error);
  });

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
