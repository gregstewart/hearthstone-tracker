import { mori, datascript } from 'datascript-mori';
import { byTimeStamp } from  '../ui-data/sort';
const { core } = datascript;
const { count, hashMap, parse , map, nth, sort, take } = mori;

const getData = (db) => {
  const query = `[:find ?start ?hasWon ?for-class ?against-class
                  :where [?e ":hasWon" ?hasWon]
                  [?e ":for/class" ?for-class]
                  [?e ":against/class" ?against-class]
                  [?e ":time/start" ?start]]`;

  return core.q(parse(query), db);
};

const extractData = (element) => {
  return hashMap('result', nth(element, 1) ? 'win' : 'loss',
      'as', nth(element, 2),
      'against', nth(element, 3));
};

export function winStreak (db) {
  return new Promise((resolve, reject) => {
    if(!db) {
      reject(new Error('Expected a result set'));
    }
    const result = getData(db);
    if(!count(result)) {
      resolve([]);
    }

    resolve(map(extractData, take(5, sort(byTimeStamp, result))));
  });
}
