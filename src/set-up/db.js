const determineAppDataRootLocation = () => {
  return process.env.HOME || process.env.LOCALAPPDATA;
};

export function watchForDBChanges (db, webContents, generateSummary, winston) {
  return db.changes({
    since: 'now',
    live: true,
    include_docs: true
  }).on('change', () => {
    return generateSummary(db, webContents);
  }).on('error', (error) => {
    winston.error(error);
  });
}

export function setUpDatabase (PouchDB) {
  return new Promise((resolve, reject) => {
    try {
      const dBLocation = determineAppDataRootLocation() + '/.hearthstone-tracker-leveldb';
      let localDatabase = new PouchDB(dBLocation, {adapter : 'leveldb'});
      return resolve(localDatabase);
    } catch (exception) {
      return reject(exception);
    }
  });
}
