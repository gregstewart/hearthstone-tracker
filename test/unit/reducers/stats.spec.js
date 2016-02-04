import {expect} from 'chai';

import * as types from '../../../app/scripts/constants/action-types';
import reducer from '../../../app/scripts/reducers/stats';

describe('Stats reducer', () => {
  it('should return the initial state', () => {
    const expectedState = {
      summaryStats: [
        {id: 1, label: "Wins", text: "0"},
        {id: 2, label: "Losses", text: "0"},
        {id: 3, label: "Ratio", text: "0%"}
      ]
    };
    expect(reducer(undefined, {})).to.deep.equal(expectedState);
  });

  it('handles updating stats', () => {
    const stats = [
      {id: 1, label: "Wins", text: "1"},
      {id: 2, label: "Losses", text: "0"},
      {id: 3, label: "Ratio", text: "100%"}
    ];
    const expectedState = {
      summaryStats: stats
    };

    expect(reducer([], {
      type: types.UPDATE_STATS,
      stats
    })).to.deep.equal(expectedState);
  });
});
