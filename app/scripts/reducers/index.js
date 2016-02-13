import { combineReducers } from 'redux';
import summaryStats from './stats';
import winStreak from './win-streak';

export default combineReducers({
  summaryStats,
  winStreak
});
