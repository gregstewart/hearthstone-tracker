import app from 'app';
import BrowserWindow from 'browser-window';

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
      height: 600,
      width: 800
  });

  mainWindow.loadURL('file://' + __dirname + '/app/index.html');
});
