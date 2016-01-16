import app from 'app';
import BrowserWindow from 'browser-window';
import LogWatcher from 'hearthstone-log-watcher';

import {dataLogger} from './src/log-watcher';

let mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  let watcher = new LogWatcher();
  let logWatcher = dataLogger(watcher);
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
  });
});
