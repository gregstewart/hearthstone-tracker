import { result } from '../../fixtures/database-result';
import { mori, datascript } from 'datascript-mori';
import { expect } from 'chai';
const { core } = datascript;
const { get, nth, toJs } = mori;

import importer from '../../../src/datascript/import';
import { scheme } from '../../../src/datascript/scheme';

import { pluckStats, summaryStats, aggregateDetails, aggregate, gameBreakdownDetails } from '../../../src/datascript/stats';

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

  it('returns win loss details as promise', () => {
    const expected = [
      { status: 'wins',
        outcomes:
        [ { class: 'Rogue', total: 3, percentage: '60%' },
          { class: 'Priest', total: 1, percentage: '20%' },
          { class: 'Druid', total: 1, percentage: '20%' }
        ]},
      { status: 'losses',
        outcomes:
        [ { class: 'Rogue', total: 1, percentage: '50%' },
          { class: 'Warlock', total: 1, percentage: '50%' }
        ]}
    ];

    gameBreakdownDetails(dbWithData).then((stats) => {
      expect(expected).to.deep.equal(stats);
    }).catch((error) => {
      expect(error).to.be.undefined;
    });
  });

  it('returns a detailed sorted summary of wins and losses by class', () => {
    let stats = toJs(aggregate(dbWithData));

    expect(stats[0].status).to.equal('wins');
    expect(stats[0].outcomes[0]).to.deep.equal({'class': 'Rogue', 'total': 3, 'percentage': '60%'});
    expect(stats[0].outcomes[1]).to.deep.equal({'class': 'Priest', 'total': 1, 'percentage': '20%'});
    expect(stats[1].status).to.equal('losses');
    expect(stats[1].outcomes[0]).to.deep.equal({'class': 'Rogue', 'total': 1, 'percentage': '50%'});
    expect(stats[1].outcomes[1]).to.deep.equal({'class': 'Warlock', 'total': 1, 'percentage': '50%'});
  });

  describe('takes a filtered mori result', () => {
    describe('wins grouped by class', () => {
      it('returns the expected result as a mori hashmap', () => {
        let stats = aggregateDetails(dbWithData, true);

        expect(get(nth(stats, 0), 'class')).to.equal('Rogue');
        expect(get(nth(stats, 0), 'total')).to.equal(3);
        expect(get(nth(stats, 0), 'percentage')).to.equal('60%');
        expect(get(nth(stats, 1), 'class')).to.equal('Priest');
        expect(get(nth(stats, 1), 'total')).to.equal(1);
        expect(get(nth(stats, 1), 'percentage')).to.equal('20%');
        expect(get(nth(stats, 2), 'class')).to.equal('Druid');
        expect(get(nth(stats, 2), 'total')).to.equal(1);
        expect(get(nth(stats, 2), 'percentage')).to.equal('20%');
      });
    });
    describe('losses grouped by class', () => {
      it('returns the expected result as a mori hashmap', () => {
        let stats = aggregateDetails(dbWithData, false);

        expect(get(nth(stats, 0), 'class')).to.equal('Rogue');
        expect(get(nth(stats, 0), 'total')).to.equal(1);
        expect(get(nth(stats, 0), 'percentage')).to.equal('50%');
        expect(get(nth(stats, 1), 'class')).to.equal('Warlock');
        expect(get(nth(stats, 1), 'total')).to.equal(1);
        expect(get(nth(stats, 1), 'percentage')).to.equal('50%');
      });
    });
  });
});
