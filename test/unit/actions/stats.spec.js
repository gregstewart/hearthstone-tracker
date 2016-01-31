import {expect} from 'chai';

import * as types from '../../../app/scripts/constants/action-types';
import {updateStats} from '../../../app/scripts/actions/stats';

describe('Actions', () => {
  describe('stats', () => {
    it('creates an action to update the stats', () => {
      const stats = [{}, {}, {}];
      const expectedAction = {
        type: types.UPDATE_STATS,
        stats
      };
      expect(updateStats(stats)).to.deep.equal(expectedAction);
    });
  });
});
