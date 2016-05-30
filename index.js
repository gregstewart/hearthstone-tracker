import { setUpDatabase, watchForDBChanges, setUpRemoteDatabase, syncData, setUpBrowserWindow, setUpLogWatcher, startLogWatcher } from './src/set-up/';
import { generateSummary } from './src/ui-data/generate-summary';
import { ipcMain } from 'electron';
import app from 'app';
import BrowserWindow from 'browser-window';
import flipit from 'flipit';
import LogWatcher from 'hearthstone-log-watcher';
import PouchDB from 'pouchdb';
import Promise from 'bluebird';
import winston from 'winston';
import winstonLoggly from 'winston-loggly';/* eslint no-unused-vars: 0 */

const setUpPromises = (flipit) => {
  const promises = [];
  promises.push(setUpDatabase(PouchDB));
  promises.push(setUpLogWatcher(LogWatcher));
  promises.push(setUpBrowserWindow(BrowserWindow));
  if (flipit.isEnabled('dataSync')) {
    promises.push(setUpRemoteDatabase(PouchDB));
  }
  return promises;
};

flipit.load('./config/feature-toggles.json');

winston.add(winston.transports.Loggly, {
  token: "2adc38ba-9a94-4e13-8a63-8c64e9c15c81",
  subdomain: "tcias",
  tags: ["Winston-NodeJS"],
  json: true
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  return Promise.all(setUpPromises(flipit))
    .spread((db, watcher, mainWindow, remoteDB) => {
      let webContents = mainWindow.webContents;
      let logWatcher = startLogWatcher(watcher, db, winston);
      let changes = watchForDBChanges(db);
      if (flipit.isEnabled('dataSync')) {
        let synced = syncData(db, remoteDB, winston);
      }

      generateSummary(db, webContents);
      changes.on('change', () => {
        return generateSummary(db, webContents);
      }).on('error', (error) => {
        winston.error(error);
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

      ipcMain.on('reload-data', () => {
        winston.info('reload-data');
        generateSummary(db, webContents);
      });
    })
    .catch(error => {
      winston.error(error);
    });
});
