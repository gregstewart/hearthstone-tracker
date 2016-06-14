import { mori, datascript } from 'datascript-mori';
const { core } = datascript;
const { parse , count, reverse, take, map, nth, hashMap, toJs } = mori;

const getData = (db) => {
  const query = `[:find ?hasWon ?for-class ?against-class
                  :where [?e ":hasWon" ?hasWon]
                  [?e ":for/class" ?for-class]
                  [?e ":against/class" ?against-class]]`;

  return core.q(parse(query), db);
};

const extractData = (element) => {
  return hashMap('result', nth(element, 0) ? 'win' : 'loss',
      'as', nth(element, 1),
      'against', nth(element, 2));
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

    resolve(toJs(map(extractData, take(5, reverse(result)))));
  });
}
