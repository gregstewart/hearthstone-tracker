import { expect } from 'chai';
import { result } from '../fixtures/database-result';
import winStreak from '../../src/win-streak';

describe('win streak', () => {
  it('returns the users streak', (done) => {
    const expected = [
      { result: "loss", as: "Rogue", against: "Rogue" },
      { result: "win", as: "Rogue", against: "Mage" },
      { result: "win", as: "Rogue", against: "Warlock" },
      { result: "loss", as: "Rogue", against: "Warlock" },
      { result: "win", as: "Priest", against: "Shaman" }
    ];

    winStreak(result).then((streak) => {
      expect(streak).to.deep.equal(expected);
      done();
    }).catch((error) => {
      expect(error).to.be.undefined;
      done();
    });

  });

  it('returns an error when no result is passed in', (done) => {
    winStreak().catch((error) => {
      expect(error).to.be.defined;
      expect(error.message).to.equal('Expected a result set');
      done();
    });
  });
});
