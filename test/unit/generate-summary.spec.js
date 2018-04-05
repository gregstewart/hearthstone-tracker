import { generateSummary } from '../../src/ui-data/generate-summary';
import { result } from '../fixtures/database-result';
import debug from 'debug';

describe('Generate Summary', () => {
  let wC, sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    wC = {
      send: sandbox.spy()
    };

  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('DataScript', () => {
    it('calls send when the summary is generated', (done) => {
      const expected = {
        summaryStats: {
          today: [{ id: 1, label: "Wins", text: "0" }, { id: 2, label: "Losses", text: "0" }, { id: 3, label: "Ratio", text: "0%" }],
          thisWeek: [{ id: 1, label: "Wins", text: "0" }, { id: 2, label: "Losses", text: "0" }, { id: 3, label: "Ratio", text: "0%" }],
          thisMonth: [{ id: 1, label: "Wins", text: "0" }, { id: 2, label: "Losses", text: "0" }, { id: 3, label: "Ratio", text: "0%" }],
          lastMonth: [{ id: 1, label: "Wins", text: "0" }, { id: 2, label: "Losses", text: "0" }, { id: 3, label: "Ratio", text: "0%" }],
          allTime: [ { id: 1, label: 'Wins', text: '5' },
              { id: 2, label: 'Losses', text: '2' },
              { id: 3, label: 'Ratio', text: '71.42857142857143%' } ]
        },
        winStreak: [ { result: 'win', as: 'Rogue', against: 'Shaman' },
            { result: 'win', as: 'Druid', against: 'Shaman' },
            { result: 'win', as: 'Priest', against: 'Shaman' },
            { result: 'loss', as: 'Rogue', against: 'Warlock' },
            { result: 'win', as: 'Rogue', against: 'Warlock' } ],
        matchBreakdown:
        [
          {
            status: 'wins',
            outcomes: [ { class: 'Rogue', total: 3, percentage: '60%' },
              { class: 'Priest', total: 1, percentage: '20%' },
              { class: 'Druid', total: 1, percentage: '20%' }
            ]
          },
          {
            status: 'losses',
            outcomes: [ { class: 'Rogue', total: 1, percentage: '50%' },
              { class: 'Warlock', total: 1, percentage: '50%' }
            ]
          }
        ]
      };

      generateSummary(result, wC)
        .then(() => {
          expect(wC.send).to.have.been.calledWith('ping', expected);
          done();
        })
        .catch((err) => {
          console.log(err);
          expect(err).to.be.undefined;
          done();
        });
    });
  });
});
