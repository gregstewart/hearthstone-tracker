import { expect } from 'chai';
import { pluckStats, summaryStats, transformSummaryStats, aggregateDetails } from '../../src/ui-data/stats';
import { byWinCondition } from '../../src/ui-data/filters';
import { result } from '../fixtures/database-result';
import { get, nth, toClj } from 'mori';
import winston from 'winston';

describe('UI data', () => {
  it('returns win loss summary as promise', () => {
    const expected = [
      {id: 1, label: "Wins", text: "3"},
      {id: 2, label: "Losses", text: "2"},
      {id: 3, label: "Ratio", text: "60%"}
    ];

    summaryStats(result).then((stats) => {
      expect(expected).to.deep.equal(stats);
    }).catch((error) => {
      winston.error(error);
      expect(error).to.be.undefined;
    });
  });

  it('returns win loss summary as a mori hashmap', () => {
    let stats = pluckStats(toClj(result.rows));
    expect(stats.wins).to.equal(3);
    expect(stats.losses).to.equal(2);
    expect(stats.ratio).to.equal(0.6 * 100 + '%');
  });

  it('returns an error when no result is passed in', () => {
    summaryStats().catch((error) => {
      expect(error).to.be.defined;
      expect(error.message).to.equal('Expected a result set');
    });
  });

  describe('takes a filtered mori result', () => {
    describe('wins grouped by class', () => {
      it('returns the expected result as a mori hashmap', () => {
        let stats = aggregateDetails(byWinCondition(toClj(result.rows), true), 'for');

        expect(get(nth(stats, 0), 'class')).to.equal('Rogue');
        expect(get(nth(stats, 0), 'value')).to.equal(2);
        expect(get(nth(stats, 0), 'percentage')).to.equal('66.66666666666666%');
        expect(get(nth(stats, 1), 'class')).to.equal('Priest');
        expect(get(nth(stats, 1), 'value')).to.equal(1);
        expect(get(nth(stats, 1), 'percentage')).to.equal('33.33333333333333%');
      });
    });
    describe('losses grouped by class', () => {
      it('returns the expected result as a mori hashmap', () => {
        let stats = aggregateDetails(byWinCondition(toClj(result.rows), false), 'against');

        expect(get(nth(stats, 0), 'class')).to.equal('Rogue');
        expect(get(nth(stats, 0), 'value')).to.equal(1);
        expect(get(nth(stats, 0), 'percentage')).to.equal('50%');
        expect(get(nth(stats, 1), 'class')).to.equal('Warlock');
        expect(get(nth(stats, 1), 'value')).to.equal(1);
        expect(get(nth(stats, 1), 'percentage')).to.equal('50%');
      });
    });
  });
});
