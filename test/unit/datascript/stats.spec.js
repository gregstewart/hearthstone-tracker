import fs from 'fs';
import sinon from 'sinon';

import { startOfDay, endOfDay, startOfWeek, subMonths, addDays,
  endOfWeek, startOfMonth, endOfMonth, format } from 'date-fns';
import { mori, datascript } from 'datascript-mori';
const { core } = datascript;
const { get, nth, toJs } = mori;

import { importer } from '../../../src/datascript/import';
import { scheme } from '../../../src/datascript/scheme';

import { pluckStats, summaryStats, aggregateDetails, aggregate, gameBreakdownDetails } from '../../../src/datascript/stats';

describe('UI Data - Datascript', () => {
  let db, dbWithData;
  before(() => {
    const result = JSON.parse(fs.readFileSync('./test/fixtures/data.json', 'utf-8'));
    db = core.empty_db(scheme);
    dbWithData = importer(db, result);
  });

  describe('all time', () => {
    it('returns win loss summary as promise', (done) => {
      const expected = [ { id: 1, label: 'Wins', text: '157' },
       { id: 2, label: 'Losses', text: '139' },
       { id: 3, label: 'Ratio', text: '53.04054054054054%' } ];

      summaryStats(dbWithData).then((stats) => {
        expect(expected).to.deep.equal(stats);
        done();
      }).catch((error) => {
        expect(error).to.be.undefined;
        done();
      });
    });

    it('returns win loss summary as a mori hashmap', () => {
      let stats = pluckStats(dbWithData);

      expect(stats.wins).to.equal(157);
      expect(stats.losses).to.equal(139);
      expect(stats.ratio).to.equal('53.04054054054054%');
    });

    it('returns an error when no result is passed in', (done) => {
      summaryStats().catch((error) => {
        expect(error).to.be.defined;
        expect(error.message).to.equal('Expected a result set');
        done();
      });
    });

    it('returns win loss details as promise', (done) => {
      const expected = [
        { status: 'wins',
          outcomes:
          [ { class: 'Warrior', total: 58, percentage: '36.94267515923567%' },
            { class: 'Paladin', total: 39, percentage: '24.840764331210192%' },
            { class: 'Druid', total: 18, percentage: '11.464968152866243%' },
            { class: 'Priest', total: 17, percentage: '10.828025477707007%' },
            { class: 'Hunter', total: 13, percentage: '8.280254777070063%' },
            { class: 'Rogue', total: 6, percentage: '3.821656050955414%' },
            { class: 'Warlock', total: 5, percentage: '3.1847133757961785%' },
            { class: 'Mage', total: 1, percentage: '0.6369426751592357%' }
          ]},
        { status: 'losses',
          outcomes:
          [ { class: 'Mage', total: 26, percentage: '18.705035971223023%' },
            { class: 'Warlock', total: 18, percentage: '12.949640287769784%' },
            { class: 'Druid', total: 17, percentage: '12.23021582733813%' },
            { class: 'Priest', total: 16, percentage: '11.510791366906476%' },
            { class: 'Warrior', total: 14, percentage: '10.071942446043165%' },
            { class: 'Paladin', total: 12, percentage: '8.633093525179856%' },
            { class: 'Shaman', total: 12, percentage: '8.633093525179856%' },
            { class: 'Rogue', total: 12, percentage: '8.633093525179856%' },
            { class: 'Hunter', total: 12, percentage: '8.633093525179856%' }
          ]}
      ];

      gameBreakdownDetails(dbWithData).then((stats) => {
        expect(expected).to.deep.equal(toJs(stats));
        done();
      }).catch((error) => {
        expect(error).to.be.undefined;
        done();
      });
    });

    it('returns a detailed sorted summary of wins and losses by class', () => {
      let stats = toJs(aggregate(dbWithData));

      expect(stats[0].status).to.equal('wins');
      expect(stats[0].outcomes[0]).to.deep.equal({'class': 'Warrior', 'total': 58, 'percentage': '36.94267515923567%'});
      expect(stats[0].outcomes[1]).to.deep.equal({'class': 'Paladin', 'total': 39, 'percentage': '24.840764331210192%'});
      expect(stats[1].status).to.equal('losses');
      expect(stats[1].outcomes[0]).to.deep.equal({'class': 'Mage', 'total': 26, 'percentage': '18.705035971223023%'});
      expect(stats[1].outcomes[1]).to.deep.equal({'class': 'Warlock', 'total': 18, 'percentage': '12.949640287769784%'});
    });

    describe('takes a filtered mori result', () => {
      describe('wins grouped by class', () => {
        it('returns the expected result as a mori hashmap', () => {
          let stats = aggregateDetails(dbWithData, true);

          expect(get(nth(stats, 0), 'class')).to.equal('Priest');
          expect(get(nth(stats, 0), 'total')).to.equal(17);
          expect(get(nth(stats, 0), 'percentage')).to.equal('10.828025477707007%');
          expect(get(nth(stats, 1), 'class')).to.equal('Paladin');
          expect(get(nth(stats, 1), 'total')).to.equal(39);
          expect(get(nth(stats, 1), 'percentage')).to.equal('24.840764331210192%');
          expect(get(nth(stats, 2), 'class')).to.equal('Warrior');
          expect(get(nth(stats, 2), 'total')).to.equal(58);
          expect(get(nth(stats, 2), 'percentage')).to.equal('36.94267515923567%');
        });
      });
      describe('losses grouped by class', () => {
        it('returns the expected result as a mori hashmap', () => {
          let stats = aggregateDetails(dbWithData, false);

          expect(get(nth(stats, 0), 'class')).to.equal('Paladin');
          expect(get(nth(stats, 0), 'total')).to.equal(12);
          expect(get(nth(stats, 0), 'percentage')).to.equal('8.633093525179856%');
          expect(get(nth(stats, 1), 'class')).to.equal('Warrior');
          expect(get(nth(stats, 1), 'total')).to.equal(14);
          expect(get(nth(stats, 1), 'percentage')).to.equal('10.071942446043165%');
        });
      });
    });
  });

  describe('today', () => {
    let clock, startDate, endDate;
    beforeEach(() => {
      clock = sinon.useFakeTimers(1462397498157);
      const now = new Date();
      startDate = format(startOfDay(now), 'x');
      endDate = format(endOfDay(now), 'x');
    });

    afterEach(() => {
      clock.restore();
    });

    it('returns win loss summary as promise', (done) => {
      const expected = [ { id: 1, label: 'Wins', text: '2' },
       { id: 2, label: 'Losses', text: '1' },
       { id: 3, label: 'Ratio', text: '66.66666666666666%' } ];

      summaryStats(dbWithData, startDate, endDate).then((stats) => {
        expect(expected).to.deep.equal(stats);
        done();
      }).catch((error) => {
        expect(error).to.be.undefined;
        done();
      });
    });

    it('returns win loss summary as a mori hashmap', () => {
      let stats = pluckStats(dbWithData, startDate, endDate);

      expect(stats.wins).to.equal(2);
      expect(stats.losses).to.equal(1);
      expect(stats.ratio).to.equal('66.66666666666666%');
    });

    it('returns a valid result when no data is found', () => {
      const now = new Date();
      const startDate = format(addDays(startOfDay(now), 1), 'x');
      const endDate = format(addDays(endOfDay(now), 1), 'x');
      let stats = pluckStats(dbWithData, startDate, endDate);

      expect(stats.wins).to.equal(0);
      expect(stats.losses).to.equal(0);
      expect(stats.ratio).to.equal('0%');
    });
  });

  describe('this week', () => {
    let clock, startDate, endDate;
    beforeEach(() => {
      clock = sinon.useFakeTimers(1462397498157);
      const now = new Date();
      startDate = format(startOfWeek(now), 'x');
      endDate = format(endOfWeek(now), 'x');
    });

    afterEach(() => {
      clock.restore();
    });

    it('returns win loss summary as promise', (done) => {
      const expected = [ { id: 1, label: 'Wins', text: '8' },
       { id: 2, label: 'Losses', text: '9' },
       { id: 3, label: 'Ratio', text: '47.05882352941176%' } ];

      summaryStats(dbWithData, startDate, endDate).then((stats) => {
        expect(expected).to.deep.equal(stats);
        done();
      }).catch((error) => {
        expect(error).to.be.undefined;
        done();
      });
    });

    it('returns win loss summary as a mori hashmap', () => {
      let stats = pluckStats(dbWithData, startDate, endDate);

      expect(stats.wins).to.equal(8);
      expect(stats.losses).to.equal(9);
      expect(stats.ratio).to.equal('47.05882352941176%');
    });
  });

  describe('this month', () => {
    let clock, startDate, endDate;
    beforeEach(() => {
      clock = sinon.useFakeTimers(1462397498157);
      const now = new Date();
      // take a month off as the data is the same as for a week
      startDate = format(subMonths(startOfMonth(now), 1), 'x');
      endDate = format(subMonths(endOfMonth(now),1 ), 'x');
    });

    afterEach(() => {
      clock.restore();
    });

    it('returns win loss summary as promise', (done) => {
      const expected = [ { id: 1, label: 'Wins', text: '68' },
       { id: 2, label: 'Losses', text: '63' },
       { id: 3, label: 'Ratio', text: '51.908396946564885%' } ];

      summaryStats(dbWithData, startDate, endDate).then((stats) => {
        expect(expected).to.deep.equal(stats);
        done();
      }).catch((error) => {
        expect(error).to.be.undefined;
        done();
      });
    });

    it('returns win loss summary as a mori hashmap', () => {
      let stats = pluckStats(dbWithData, startDate, endDate);

      expect(stats.wins).to.equal(68);
      expect(stats.losses).to.equal(63);
      expect(stats.ratio).to.equal('51.908396946564885%');
    });
  });
});
