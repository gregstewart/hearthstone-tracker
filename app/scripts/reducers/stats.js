import * as types from '../constants/action-types';

export default function (state = [], action) {
  if (action.type === types.UPDATE_STATS) {
    return action.summaryStats.map((stat) => {
      return stat;
    });
  }

  return state;
}
