import * as types from '../constants/action-types';

export function updateWinStreak (winStreak) {
  return {
    type: types.UPDATE_WIN_STREAK,
    winStreak
  };
}
