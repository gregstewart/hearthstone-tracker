import * as types from '../constants/action-types';

const initialState = {
  winStreak: []
};

export default function (state = initialState, action) {
  if (action.type === types.UPDATE_WIN_STREAK) {
    return Object.assign({}, state, {winStreak: action.winStreak}
    );
  }

  return state;
}
