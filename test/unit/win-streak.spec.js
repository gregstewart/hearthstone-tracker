import { expect } from 'chai';
import { mori } from 'datascript-mori';
import { result } from '../fixtures/database-result';
import { winStreak } from '../../src/win-streak';

const { toClj, toJs } = mori;

describe('Win streak', () => {
  it('returns the users streak', (done) => {
    const expected = [ { result: 'win', as: 'Rogue', against: 'Shaman' },
      { result: 'win', as: 'Druid', against: 'Shaman' },
      { result: 'loss', as: 'Rogue', against: 'Warlock' },
      { result: 'win', as: 'Rogue', against: 'Warlock' },
      { result: 'win', as: 'Rogue', against: 'Mage' } ];

    winStreak(toClj(result.rows)).then((streak) => {
      expect(toJs(streak)).to.deep.equal(expected);
      done();
    }).catch((error) => {
      expect(error).to.be.undefined;
      done();
    });

  });

  it('returns an empty array when there are no values', (done) => {
    winStreak(toClj([])).then((streak) => {
      expect(streak).to.deep.equal([]);
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
