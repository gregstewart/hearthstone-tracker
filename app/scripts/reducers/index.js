import { combineReducers } from 'redux';
import { summaryStats } from './stats';
import { winStreak } from './win-streak';
import { matchBreakdown } from './match-breakdown';

export const reducers = combineReducers({
  matchBreakdown,
  summaryStats,
  winStreak
});
