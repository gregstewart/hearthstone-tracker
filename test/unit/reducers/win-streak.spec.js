import { expect } from 'chai';
import * as types from '../../../app/scripts/constants/action-types';
import reducer from '../../../app/scripts/reducers/win-streak';

describe('Win streak reducer', () => {
  it('should return the initial state', () => {
    const expectedState = [];
    expect(reducer(undefined, {})).to.deep.equal(expectedState);
  });

  it('handles updating win streak', () => {
    const winStreak = [
      {id: 1, label: "Win", as: "Rogue", against: "Paladin"},
      {id: 2, label: "Loss", as: "Rogue", against: "Warlock"},
      {id: 3, label: "Win", as: "Paladin", against: "Druid"}
    ];

    expect(reducer([], {
      type: types.UPDATE_WIN_STREAK,
      winStreak
    })).to.deep.equal(winStreak);
  });
});
