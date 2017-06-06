import { formattedPercentage, transformSummaryStats } from '../ui-data/transformers';
import { highestToLowest } from '../ui-data/sort';
import { format } from 'date-fns';
import { datascript, mori } from 'datascript-mori';
const { core } = datascript;
const { first, hashMap, last, map, parse, repeat, sort, vector } = mori;

const checkForDb = (db, reject) => {
  if(!db) {
    return reject(new Error('Expected a result set'));
  }
};

const getRatio = (wins, losses) => {
  return (wins === 0 && losses === 0) ? 0 : wins/(wins+losses);
};

export function pluckStats (db, ...dateRange) {
  const query = `[:find (count ?e) .
                  :in $ ?a ?b ?c
                  :where [?e ":hasWon" ?a]
                         [?e ":time/start" ?id]
                         [(> ?id ?b)]
                         [(< ?id ?c)]]`;

  const startDate = dateRange[0] ? dateRange[0] : format(new Date(+0), 'x');
  const endDate = dateRange[1] ? dateRange[1] : format(new Date(), 'x');

  // q, db, a = has won, b = start date, c = end date
  const calculateWins = core.q(parse(query), db, true, startDate, endDate);
  const calculateLosses = core.q(parse(query), db, false, startDate, endDate);
  const wins = calculateWins !== null ? calculateWins : 0;
  const losses = calculateLosses !== null ? calculateLosses : 0;
  const ratio = formattedPercentage(getRatio(wins, losses));

  return {
    wins, losses, ratio
  };
}

export function summaryStats (db, ...dateRange) {
  let promise = new Promise((resolve, reject) => {
    checkForDb(db, reject);

    resolve(transformSummaryStats(pluckStats(db, ...dateRange)));
  });

  return promise;
}

export function aggregate (db) {
  return vector(
    hashMap('status', 'wins', 'outcomes', sort(highestToLowest, aggregateDetails(db, true))),
    hashMap('status', 'losses', 'outcomes', sort(highestToLowest, aggregateDetails(db, false)))
  );
}

export function aggregateDetails (db, outcome) {
  const getClassAndCountByWinCondition = (db, outcome) => {
    const className = outcome ? ":for/class" : ":against/class";
    const query = `[:find (count ?e) ?class-name
                    :in $ ?a
                    :where [?e ":hasWon" ?a]
                    [?e "${className}" ?class-name]]`;

    return core.q(parse(query), db, outcome);
  };

  const getCount = (db, outcome) => {
    const query = `[:find (count ?e) .
                    :in $ ?a
                    :where [?e ":hasWon" ?a]]`;

    return core.q(parse(query), db, outcome);
  };

  const aggregateResults = (element, totalRows) => {
    const total = first(element);
    const percentageAsString = formattedPercentage(total/totalRows);

    return hashMap('class', last(element), 'total', total, 'percentage', percentageAsString);
  };

  const result = getClassAndCountByWinCondition(db, outcome);
  const total = getCount(db, outcome);

  return map(aggregateResults, result, repeat(total, total));
}

export function gameBreakdownDetails (db) {
  let promise = new Promise((resolve, reject) => {
    checkForDb(db, reject);

    resolve(aggregate(db));
  });

  return promise;
}
