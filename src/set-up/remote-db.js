export function syncData (localDB, remoteDB, winston) {
  return localDB.replicate.to(remoteDB).on('complete', () => {
    return;
  }).on('error', (err) => {
    winston.error(err);
  });
}

export function setUpRemoteDatabase (PouchDB) {
  return new Promise((resolve, reject) => {
    try {
      let remoteDB = new PouchDB('http://localhost:5984/hearthstone-tracker');
      return resolve(remoteDB);
    } catch (exception) {
      return reject(exception);
    }
  });
}
