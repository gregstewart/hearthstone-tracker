import { expect } from 'chai';
import { updateStats } from '../../../app/scripts/actions/stats';
import { updateWinStreak } from '../../../app/scripts/actions/win-streak';
import * as types from '../../../app/scripts/constants/action-types';

describe('Actions', () => {
  describe('stats', () => {
    it('creates an action to update the stats', () => {
      const summaryStats = [{}, {}, {}];
      const expectedAction = {
        type: types.UPDATE_STATS,
        summaryStats
      };
      expect(updateStats(summaryStats)).to.deep.equal(expectedAction);
    });
  });

  describe('win sreak', () => {
    it('creates an action to update the stats', () => {
      const winStreak = [{}, {}, {}, {}, {}];
      const expectedAction = {
        type: types.UPDATE_WIN_STREAK,
        winStreak
      };
      expect(updateWinStreak(winStreak)).to.deep.equal(expectedAction);
    });
  });
});
