import debug from 'debug';
import { expect } from 'chai';
import { toClj } from 'mori';

import {result} from '../fixtures/database-result';
import { pluckStats, summaryStats, transformSummaryStats } from '../../src/ui-data/stats';

// Define some debug logging functions for easy and readable debug messages.
let log = {
  test: debug('HT:TEST')
};

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
      log.test(error);
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

  it('transforms the data into the UI shape', () => {
    const expected = [
      {id: 1, label: "Wins", text: "3"},
      {id: 2, label: "Losses", text: "2"},
      {id: 3, label: "Ratio", text: "60%"}
    ];
    const input = {
      wins: 3,
      losses: 2,
      ratio: 0.6 * 100 + '%'
    };

    expect(expected).to.deep.equal(transformSummaryStats(input));
  });
});
