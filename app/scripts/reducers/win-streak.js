import * as types from '../constants/action-types';

export const winStreak = (state = [], action) => {
  if (action.type === types.UPDATE_WIN_STREAK) {
    return action.winStreak.map((streak) => {
      return streak;
    });
  }

  return state;
};
