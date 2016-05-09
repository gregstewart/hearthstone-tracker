import * as types from '../constants/action-types';

export default function (state = [], action) {
  if (action.type === types.UPDATE_MATCH_BREAKDOWN) {
    let matchBreakdown = {};
    Object.keys(action.matchBreakdown).forEach(status => {
      matchBreakdown[status] = action.matchBreakdown[status].map((stat) => {
        return stat;
      });
    });
    return matchBreakdown;
  }

  return state;
}
