import createFile from 'create-file';
import app from 'app';
import BrowserWindow from 'browser-window';

let mainWindow = null;

const createLogFile = () => {
  const pathToLogFile = process.env['HOME'] + '/Library/Preferences/Blizzard/Hearthstone/log.config';
  const contents = `[LoadingScreen]
LogLevel=1
FilePrinting=false
ConsolePrinting=true
ScreenPrinting=false

[Zone]
LogLevel=1
FilePrinting=false
ConsolePrinting=true
ScreenPrinting=false

[Asset]
LogLevel=1
ConsolePrinting=true

[Bob]
LogLevel=1
ConsolePrinting=true

[Power]
LogLevel=1
ConsolePrinting=true`

  createFile(pathToLogFile, contents, (error) => {
    if (error) {
      console.log(error);
    }
  });
}

app.on('ready', () => {
  createLogFile();

  mainWindow = new BrowserWindow({
      height: 600,
      width: 800
  });

  mainWindow.loadURL('file://' + __dirname + '/app/index.html');
});
