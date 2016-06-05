import { result } from '../../fixtures/database-result';
import { mori, datascript } from 'datascript-mori';
import { expect } from 'chai';
const { core } = datascript;

import importer from '../../../src/datascript/import';
import { scheme } from '../../../src/datascript/scheme';

import { pluckStats, summaryStats } from '../../../src/datascript/stats';

describe('UI Data - Datascript', () => {
  let db, dbWithData;
  beforeEach(() => {
    db = core.empty_db(scheme);
    dbWithData = importer(db, result);
  });

  it('returns win loss summary as promise', () => {
    const expected = [
      {id: 1, label: 'Wins', text: '5'},
      {id: 2, label: 'Losses', text: '2'},
      {id: 3, label: 'Ratio', text: '71.42857142857143%'}
    ];

    summaryStats(dbWithData).then((stats) => {
      expect(expected).to.deep.equal(stats);
    }).catch((error) => {
      expect(error).to.be.undefined;
    });
  });

  it('returns win loss summary as a mori hashmap', () => {
    let stats = pluckStats(dbWithData);

    expect(stats.wins).to.equal(5);
    expect(stats.losses).to.equal(2);
    expect(stats.ratio).to.equal('71.42857142857143%');
  });

  it('returns an error when no result is passed in', () => {
    summaryStats().catch((error) => {
      expect(error).to.be.defined;
      expect(error.message).to.equal('Expected a result set');
    });
  });
});
