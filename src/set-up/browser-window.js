import BrowserWindow from 'browser-window';
import Promise from 'bluebird';

export function setUpBrowserWindow () {
  return new Promise((resolve, reject) => {
    try {
      let mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        icon:'./assets/16x16.png'
      });
      // can we use process.cwd() ?
      mainWindow.loadURL('file://' + __dirname + '/../../app/index.html');
      mainWindow.openDevTools();
      return resolve(mainWindow);
    } catch(exception) {
      return reject(exception);
    }
  });
}
