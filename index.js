import { dataLogger } from './src/log-watcher';
import { generateSummary } from './src/ui-data/generate-summary';
import { ipcMain } from 'electron';
import app from 'app';
import BrowserWindow from 'browser-window';
import Logger from 'le_node';
import LogWatcher from 'hearthstone-log-watcher';
import PouchDB from 'pouchdb';
import winston from 'winston';

winston.add(winston.transports.Logentries, { token: 'c5737085-b87c-4e27-9156-754d1447456f' });
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
    width: 800,
    icon:'./assets/16x16.png'
  });

  mainWindow.loadURL('file://' + __dirname + '/app/index.html');
  mainWindow.openDevTools();
  let webContents = mainWindow.webContents;

  generateSummary(db, webContents);

  let changes = db.changes({
    since: 'now',
    live: true,
    include_docs: true
  }).on('change', (change) => {
    winston.change(change);
    return generateSummary(db, webContents);
  }).on('complete', (info) => {
    winston.complete(info);
  }).on('error', (error) => {
    winston.error(error);
  });

  ipcMain.on('reload-data', () => {
    winston.info('reload-data');
    generateSummary(db, webContents);
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
