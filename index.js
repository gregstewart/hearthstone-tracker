import app from 'app';
import BrowserWindow from 'browser-window';

import {createLogFile} from './src/init';

let mainWindow = null;

app.on('ready', () => {
  createLogFile();

  mainWindow = new BrowserWindow({
    height: 600,
    width: 800
  });

  mainWindow.loadURL('file://' + __dirname + '/app/index.html');
});
