import { expect } from 'chai';
import { result } from '../fixtures/database-result';
import winStreak from '../../src/win-streak';

describe('win streak', () => {
  it('returns the users streak', () => {
    const expected = [
      { result: "loss", as: "Rogue", against: "Rogue" },
      { result: "win", as: "Rogue", against: "Mage" },
      { result: "win", as: "Rogue", against: "Warlock" },
      { result: "loss", as: "Rogue", against: "Warlock" },
      { result: "win", as: "Priest", against: "Shaman" }
    ]

    expect(winStreak(result)).to.deep.equal(expected);
  });
});
