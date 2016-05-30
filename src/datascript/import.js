import { datascript, helpers } from 'datascript-mori';

const { core } = datascript;
const { entities_to_clj } = helpers;

export default function (db, data) {
  let entities = entities_to_clj(data.rows.map((item) => {
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
  })
  );
  return core.db_with(db, entities);
}
