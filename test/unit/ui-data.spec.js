import debug from 'debug';
import chai from 'chai';
import sinon from 'sinon';
chai.use(require('sinon-chai'));
const expect = chai.expect;

import {result} from '../fixtures/database-result';
import {summaryStats, transformSummaryStats} from '../../src/ui-data/stats';

// Define some debug logging functions for easy and readable debug messages.
let log = {
  test: debug('HT:TEST')
};

describe('UI data', () => {
  it('returns win loss summary', () => {
    summaryStats(result).then((stats) => {
      expect(stats.wins).to.equal(3);
      expect(stats.losses).to.equal(2);
      expect(stats.ratio).to.equal(0.6 * 100 + '%');
    }).catch((error) => {
      log.test(error)
      expect(error).to.be.undefined;
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
    }

    expect(expected).to.deep.equal(transformSummaryStats(input));
  })
});
