import { generateSummary } from '../ui-data/generate-summary';
import PouchDB from 'pouchdb';
import Promise from 'bluebird';
import winston from 'winston';

export function watchForDBChanges (db, webContents) {
  return db.changes({
    since: 'now',
    live: true,
    include_docs: true
  }).on('change', (change) => {
    winston.info(change);
    return generateSummary(db, webContents);
  }).on('complete', (info) => {
    winston.info(info);
  }).on('error', (error) => {
    winston.error(error);
  });
}

export function setUpDatabase () {
  return new Promise((resolve, reject) => {
    try {
      let db = new PouchDB('hearthstone-tracker-leveldb', {adapter : 'leveldb'});
      return resolve(db);
    } catch (exception) {
      return reject(exception);
    }
  });
}
