import createFile from 'create-file';

export function createLogFile () {
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
ScreenPrinting=false`;

  createFile(pathToLogFile, contents, (error) => {
    if (error) {
      /*eslint-disable no-console */
      console.log(error);
    }
  });
}
