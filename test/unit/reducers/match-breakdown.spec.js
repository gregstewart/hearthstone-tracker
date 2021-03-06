import { expect } from 'chai';
import * as types from '../../../app/scripts/constants/action-types';
import { matchBreakdown as reducer } from '../../../app/scripts/reducers/match-breakdown';

describe('Match Breakdown reducer', () => {
  it('should return the initial state', () => {
    const expectedState = [];
    expect(reducer(undefined, {})).to.deep.equal(expectedState);
  });

  it('handles updating match breakdown', () => {
    const matchBreakdown = [
      { status: 'wins',
        outcomes: [ { class: 'Rogue', total: 3, percentage: '60%' },
          { class: 'Priest', total: 1, percentage: '20%' },
          { class: 'Druid', total: 1, percentage: '20%' }
        ]
      },
      { status: 'losses',
        outcomes: [ { class: 'Rogue', total: 1, percentage: '50%' },
          { class: 'Warlock', total: 1, percentage: '50%' }
        ]
      }
    ];

    expect(reducer([], {
      type: types.UPDATE_MATCH_BREAKDOWN,
      matchBreakdown
    })).to.deep.equal(matchBreakdown);
  });
});
