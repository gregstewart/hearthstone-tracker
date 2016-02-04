import * as types from '../constants/action-types';

export function updateStats (stats) {
  return {
    type: types.UPDATE_STATS,
    stats
  };
}
