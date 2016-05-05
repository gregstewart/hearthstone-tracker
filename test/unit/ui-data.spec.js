import { expect } from 'chai';
import { pluckStats, summaryStats, aggregateDetails, aggregate, gameBreakdownDetails } from '../../src/ui-data/stats';
import { byWinCondition } from '../../src/ui-data/filters';
import { result } from '../fixtures/database-result';
import { get, hashMap, map, nth, toClj, updateIn, vector } from 'mori';
import winston from 'winston';

describe('UI data', () => {
  it('returns win loss summary as promise', () => {
    const expected = [
      {id: 1, label: 'Wins', text: '5'},
      {id: 2, label: 'Losses', text: '2'},
      {id: 3, label: 'Ratio', text: '71.42857142857143%'}
    ];

    summaryStats(toClj(result.rows)).then((stats) => {
      expect(expected).to.deep.equal(stats);
    }).catch((error) => {
      expect(error).to.be.undefined;
    });
  });

  it('returns win loss summary as a mori hashmap', () => {
    let stats = pluckStats(toClj(result.rows));
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
    const expected = {
      wins:
      [ { class: 'Rogue', total: 3, percentage: '60%' },
        { class: 'Priest', total: 1, percentage: '20%' },
        { class: 'Druid', total: 1, percentage: '20%' }
      ],
      losses:
      [ { class: 'Rogue', total: 1, percentage: '50%' },
        { class: 'Warlock', total: 1, percentage: '50%' }
      ]
    };

    gameBreakdownDetails(toClj(result.rows)).then((stats) => {
      expect(expected).to.deep.equal(stats);
    }).catch((error) => {
      winston.error(error);
      expect(error).to.be.undefined;
    });
  });

  it('returns a detailed summary of wins and losses by class', () => {
    let stats = aggregate(toClj(result.rows));

    expect(stats.wins[0]).to.deep.equal({'class': 'Rogue', 'total': 3, 'percentage': '60%'});
    expect(stats.wins[1]).to.deep.equal({'class': 'Priest', 'total': 1, 'percentage': '20%'});
    expect(stats.losses[0]).to.deep.equal({'class': 'Rogue', 'total': 1, 'percentage': '50%'});
    expect(stats.losses[1]).to.deep.equal({'class': 'Warlock', 'total': 1, 'percentage': '50%'});
  });

  describe('takes a filtered mori result', () => {
    describe('wins grouped by class', () => {
      it('returns the expected result as a mori hashmap', () => {
        let stats = aggregateDetails(byWinCondition(toClj(result.rows), true), 'for');

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
        let stats = aggregateDetails(byWinCondition(toClj(result.rows), false), 'against');

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
