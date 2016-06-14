import { expect } from 'chai';
import { mori, datascript } from 'datascript-mori';
const { core } = datascript;

import importer from '../../../src/datascript/import';
import { scheme } from '../../../src/datascript/scheme';

import { result } from '../../fixtures/database-result';
import { winStreak } from '../../../src/datascript/win-streak';

const { toClj, toJs } = mori;

describe('Win streak - DataScript', () => {
  let db, dbWithData;
  beforeEach(() => {
    db = core.empty_db(scheme);
    dbWithData = importer(db, result);
  });

  it('returns the users streak', (done) => {
    const expected = [ { result: 'win', as: 'Rogue', against: 'Shaman' },
     { result: 'win', as: 'Druid', against: 'Shaman' },
     { result: 'win', as: 'Priest', against: 'Shaman' },
     { result: 'loss', as: 'Rogue', against: 'Warlock' },
     { result: 'win', as: 'Rogue', against: 'Warlock' } ];

    winStreak(dbWithData).then((streak) => {
      expect(toJs(streak)).to.deep.equal(expected);
      done();
    }).catch((error) => {
      expect(error).to.be.undefined;
      done();
    });

  });

  it('returns an empty array when there are no values', (done) => {
    winStreak(core.empty_db(scheme)).then((streak) => {
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
