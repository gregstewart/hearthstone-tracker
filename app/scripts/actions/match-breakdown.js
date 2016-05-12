import * as types from '../constants/action-types';

export function updateMatchBreakdown (matchBreakdown) {
  return {
    type: types.UPDATE_MATCH_BREAKDOWN,
    matchBreakdown
  };
}
