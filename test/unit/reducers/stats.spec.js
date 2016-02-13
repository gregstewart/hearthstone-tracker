import { expect } from 'chai';
import * as types from '../../../app/scripts/constants/action-types';
import reducer from '../../../app/scripts/reducers/stats';

describe('Stats reducer', () => {
  it('should return the initial state', () => {
    const expectedState = [];
    expect(reducer(undefined, {})).to.deep.equal(expectedState);
  });

  it('handles updating stats', () => {
    const summaryStats = [
      {id: 1, label: "Wins", text: "1"},
      {id: 2, label: "Losses", text: "0"},
      {id: 3, label: "Ratio", text: "100%"}
    ];
    
    expect(reducer([], {
      type: types.UPDATE_STATS,
      summaryStats
    })).to.deep.equal(summaryStats);
  });
});
