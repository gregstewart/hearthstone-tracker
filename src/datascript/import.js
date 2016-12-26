import { datascript, helpers, mori } from 'datascript-mori';

const { core } = datascript;
const { entities_to_clj } = helpers;
const { filter, map } = mori;

import { keyValueChecker } from './key-value-checker';

export const importer = (db, data) => {
  const filtered = filter(keyValueChecker, data.rows);
  const entities = entities_to_clj(map((item) => {
    return {
      ":db/id": item.doc.startTime,
      ":time/start": item.doc.startTime,
      ":time/end": item.doc.endTime,
      ":for/name": item.doc.for.name,
      ":for/id": item.doc.for.id,
      ":for/class": item.doc.for.class,
      ":against/name": item.doc.against.name,
      ":against/id": item.doc.against.id,
      ":against/class": item.doc.against.class,
      ":hasWon": item.doc.hasWon
    };
  }, filtered));

  return core.db_with(db, entities);
};
