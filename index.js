import createFile from 'create-file';
import app from 'app';
import BrowserWindow from 'browser-window';

let mainWindow = null;

const createLogFile = () => {
  const pathToLogFile = process.env['HOME'] + '/Library/Preferences/Blizzard/Hearthstone/log.config';
  const contents = `[Ben]
LogLevel=1
FilePrinting=false
ConsolePrinting=true
ScreenPrinting=false
[Bob]
LogLevel=1
FilePrinting=false
ConsolePrinting=true
ScreenPrinting=false
[Cameron]
LogLevel=1
FilePrinting=false
ConsolePrinting=true
ScreenPrinting=false
[Derek]
LogLevel=1
FilePrinting=false
ConsolePrinting=true
ScreenPrinting=false
[FaceDownCard]
LogLevel=1
FilePrinting=false
ConsolePrinting=true
ScreenPrinting=false
[Kyle]
LogLevel=1
FilePrinting=false
ConsolePrinting=true
ScreenPrinting=false
[Mike]
LogLevel=1
FilePrinting=false
ConsolePrinting=true
ScreenPrinting=false
[Net]
LogLevel=1
FilePrinting=false
ConsolePrinting=true
ScreenPrinting=false
[Power]
LogLevel=1
FilePrinting=false
ConsolePrinting=true
ScreenPrinting=false
[Rachelle]
LogLevel=1
FilePrinting=false
ConsolePrinting=true
ScreenPrinting=false
[Zone]
LogLevel=1
FilePrinting=false
ConsolePrinting=true
ScreenPrinting=false`

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
