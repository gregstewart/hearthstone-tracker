import { combineReducers } from 'redux';
import stats from './stats';
import winStreak from './win-streak';

export default combineReducers({
  stats,
  winStreak
});
