import { updateStats } from '../../../app/scripts/actions/stats';
import { updateWinStreak } from '../../../app/scripts/actions/win-streak';
import { updateMatchBreakdown } from '../../../app/scripts/actions/match-breakdown';
import * as types from '../../../app/scripts/constants/action-types';

describe('Actions', () => {
  describe('stats', () => {
    it('creates an action to update the stats', () => {
      const summaryStats = {allTime: [{}, {}, {}]};
      const expectedAction = {
        type: types.UPDATE_STATS,
        summaryStats
      };
      expect(updateStats(summaryStats)).to.deep.equal(expectedAction);
    });
  });

  describe('win streak', () => {
    it('creates an action to update the stats', () => {
      const winStreak = [{}, {}, {}, {}, {}];
      const expectedAction = {
        type: types.UPDATE_WIN_STREAK,
        winStreak
      };
      expect(updateWinStreak(winStreak)).to.deep.equal(expectedAction);
    });
  });

  describe('match breakdown', () => {
    it('creates an action to update the match breakdown', () => {
      const matchBreakdown = [{}, {}];
      const expectedAction = {
        type: types.UPDATE_MATCH_BREAKDOWN,
        matchBreakdown
      };
      expect(updateMatchBreakdown(matchBreakdown)).to.deep.equal(expectedAction);
    });
  });
});
