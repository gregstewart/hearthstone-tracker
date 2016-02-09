import * as types from '../constants/action-types';

export function updateStats (summaryStats) {
  return {
    type: types.UPDATE_STATS,
    summaryStats
  };
}
