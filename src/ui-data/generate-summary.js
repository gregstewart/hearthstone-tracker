import winston from 'winston';
import { mori, datascript } from 'datascript-mori';
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { importer } from '../datascript/import';
import { scheme } from '../datascript/scheme';
import { summaryStats as summaryStatsDS, gameBreakdownDetails as gameBreakdownDetailsDS } from '../datascript/stats';
import { winStreak as winStreakDS } from '../datascript/win-streak';

const { toJs } = mori;
const { core } = datascript;

export function generateSummary (result, wC) {
  const db = core.empty_db(scheme);
  const dbWithData = importer(db, result);
  const now = new Date();
  const promises = [summaryStatsDS(dbWithData),
    summaryStatsDS(dbWithData, format(startOfDay(now), 'x'), format(endOfDay(now), 'x')),
    summaryStatsDS(dbWithData, format(startOfWeek(now), 'x'), format(endOfWeek(now), 'x')),
    summaryStatsDS(dbWithData, format(startOfMonth(now), 'x'), format(endOfMonth(now), 'x')),
    winStreakDS(dbWithData),
    gameBreakdownDetailsDS(dbWithData)];

  return Promise.all(promises)
    .then((results) => {
      wC.send('ping', {
        summaryStats: {
          today: toJs(results[1]),
          thisWeek: toJs(results[2]),
          thisMonth: toJs(results[3]),
          allTime: toJs(results[0])
        }, winStreak: toJs(results[4]), matchBreakdown: toJs(results[5])});
    })
    .catch((error) => {
      winston.error(error);
    });
}
