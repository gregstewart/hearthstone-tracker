import { summaryStats, gameBreakdownDetails } from './stats';
import { summaryStats as summaryStatsDS } from '../datascript/stats';
import { gameBreakdownDetails as gameBreakdownDetailsDS } from '../datascript/stats';
import { winStreak as winStreakDS } from '../datascript/win-streak';
import winston from 'winston';
import winStreak from '../win-streak';
import { mori, datascript } from 'datascript-mori';
import importer from '../datascript/import';
import { scheme } from '../datascript/scheme';

const { map, toClj, toJs, updateIn, vector } = mori;
const { core } = datascript;

const stripLog = (row) => {
  return updateIn(row, ['doc', 'log'], () => { return vector(); });
};

export function generateSummary (result, wC, flipit) {
  let reducedSet, promises;
  if(flipit && flipit.isEnabled('dataScript')) {
    const db = core.empty_db(scheme);
    const dbWithData = importer(db, result);

    promises = [summaryStatsDS(dbWithData), winStreakDS(dbWithData), gameBreakdownDetailsDS(dbWithData)];
  } else {
    reducedSet = map(stripLog, toClj(result.rows));
    promises = [summaryStats(reducedSet), winStreak(reducedSet), gameBreakdownDetails(reducedSet)];
  }

  return Promise.all(promises)
    .then((results) => {
      wC.send('ping', {summaryStats: toJs(results[0]), winStreak: toJs(results[1]), matchBreakdown: results[2]});
    })
    .catch((error) => {
      winston.error(error);
    });
}
