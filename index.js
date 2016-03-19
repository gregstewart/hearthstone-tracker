import { setUpDatabase, watchForDBChanges, setUpBrowserWindow, setUpLogWatcher, startLogWatcher } from './src/set-up/';
import { generateSummary } from './src/ui-data/generate-summary';
import { ipcMain } from 'electron';
import app from 'app';
import BrowserWindow from 'browser-window';
import LogWatcher from 'hearthstone-log-watcher';
import PouchDB from 'pouchdb';
import Promise from 'bluebird';
import winston from 'winston';
import winstonLoggly from 'winston-loggly';/* eslint no-unused-vars: 0 */

winston.add(winston.transports.Loggly, {
  token: "2adc38ba-9a94-4e13-8a63-8c64e9c15c81",
  subdomain: "tcias",
  tags: ["Winston-NodeJS"],
  json:true
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  return Promise.all([setUpDatabase(PouchDB), setUpLogWatcher(LogWatcher), setUpBrowserWindow(BrowserWindow)]).spread((db, watcher, mainWindow) => {
    let logWatcher = startLogWatcher(watcher, db);
    let webContents = mainWindow.webContents;
    let changes = watchForDBChanges(db, webContents);

    generateSummary(db, webContents);

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null;
      logWatcher.stop();
      changes.cancel();
    });

    ipcMain.on('reload-data', () => {
      winston.info('reload-data');
      generateSummary(db, webContents);
    });
  }).catch(error => {
    winston.error(error);
  });
});
