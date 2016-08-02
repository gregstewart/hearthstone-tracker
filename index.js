import { setUpDatabase, watchForDBChanges, fetchData, setUpRemoteDatabase, syncData, setUpBrowserWindow, setUpLogWatcher, startLogWatcher } from './src/set-up/';
import { generateSummary } from './src/ui-data/generate-summary';
import { ipcMain, app, BrowserWindow } from 'electron';
import flipit from 'flipit';
import LogWatcher from 'farseer';
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

const loadFeatureToggles = (flipit) => {
  return new Promise((resolve, reject) => {
    const filePath = __dirname + '/config/feature-toggles.json';
    flipit.load(filePath, (error, result) => {
      winston.info(error, result);
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

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
  return loadFeatureToggles(flipit).then(() => {
    return Promise.all(setUpPromises(flipit))
      .spread((db, watcher, mainWindow, remoteDB) => {
        let webContents = mainWindow.webContents;
        let logWatcher = startLogWatcher(watcher, db, winston);
        let changes = watchForDBChanges(db);
        if (flipit.isEnabled('dataSync')) {
          let synced = syncData(db, remoteDB, winston);
        }

        changes.on('change', () => {
          return fetchData(db).then((result) => {
            generateSummary(result, webContents, flipit);
          });
        }).on('error', (error) => {
          winston.error(error);
        });

        fetchData(db).then((result) => {
          generateSummary(result, webContents, flipit);
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
            return fetchData(db).then((result) => {
              generateSummary(result, webContents, flipit);
            });
          });
        });
      })
      .catch(error => {
        winston.error(error);
      });
  });
});
