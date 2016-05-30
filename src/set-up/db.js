const determineAppDataRootLocation = () => {
  return process.env.HOME || process.env.LOCALAPPDATA;
};

export function fetchData (db) {
  return new Promise((resolve) => {
    return db.allDocs({include_docs: true}).then((result) => {
      resolve(result);
    });
  });
}

export function watchForDBChanges (db) {
  return db.changes({
    since: 'now',
    live: true,
    include_docs: true
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
