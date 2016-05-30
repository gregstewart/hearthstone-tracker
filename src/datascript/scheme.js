import { mori } from 'datascript-mori';

const { hashMap } = mori;

export const scheme = hashMap(
  ":time/start", hashMap(":db/valueType", ":db.type/instant"),
  ":time/end", hashMap(":db/valueType", ":db.type/instant"),
  ":for/name", hashMap(":db/valueType", ":db.type/string"),
  ":for/id", hashMap(":db/valueType", ":db.type/long"),
  ":for/class", hashMap(":db/valueType", ":db.type/string"),
  ":against/name", hashMap(":db/valueType", ":db.type/string"),
  ":against/id", hashMap(":db/valueType", ":db.type/long"),
  ":against/class", hashMap(":db/valueType", ":db.type/string"),
  ":hasWon", hashMap(":db/valueType", ":db.type/boolean")
);
