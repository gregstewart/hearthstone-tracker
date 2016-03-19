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
      let db = new PouchDB('hearthstone-tracker-leveldb', {adapter : 'leveldb'});
      return resolve(db);
    } catch (exception) {
      return reject(exception);
    }
  });
}
