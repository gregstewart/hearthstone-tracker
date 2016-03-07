import { dataLogger } from './src/log-watcher';
import { generateSummary } from './src/ui-data/generate-summary';
import { ipcMain } from 'electron';
import app from 'app';
import BrowserWindow from 'browser-window';
import winstonLoggly from 'winston-loggly';/* eslint no-unused-vars: 0 */
import LogWatcher from 'hearthstone-log-watcher';
import PouchDB from 'pouchdb';
import winston from 'winston';

winston.add(winston.transports.Loggly, {
  token: "2adc38ba-9a94-4e13-8a63-8c64e9c15c81",
  subdomain: "tcias",
  tags: ["Winston-NodeJS"],
  json:true
});
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
    winston.info(change);
    return generateSummary(db, webContents);
  }).on('complete', (info) => {
    winston.info(info);
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
