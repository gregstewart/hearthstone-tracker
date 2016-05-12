import * as types from '../constants/action-types';

export default function (state = [], action) {
  if (action.type === types.UPDATE_MATCH_BREAKDOWN) {
    return action.matchBreakdown.map(statii => {
      return statii;
    });
  }

  return state;
}
