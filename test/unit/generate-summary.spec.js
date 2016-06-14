import { generateSummary } from '../../src/ui-data/generate-summary';
import { result } from '../fixtures/database-result';
import chai from 'chai';
import debug from 'debug';
import sinon from 'sinon';
import sinonAsPromised from 'sinon-as-promised';

chai.use(require('sinon-chai'));
const expect = chai.expect;

describe('Generate Summary', () => {
  let wC, sandbox, flipit;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    wC = {
      send: sandbox.spy()
    };

  });

  afterEach(() => {
    sandbox.restore();
  });

  it('calls send when the summary is generated', (done) => {
    const expected = {
      summaryStats:
        [ { id: 1, label: 'Wins', text: '5' },
          { id: 2, label: 'Losses', text: '2' },
          { id: 3, label: 'Ratio', text: '71.42857142857143%' } ],
      winStreak:
        [ { result: 'win', as: 'Rogue', against: 'Shaman' },
          { result: 'win', as: 'Druid', against: 'Shaman' },
          { result: 'loss', as: 'Rogue', against: 'Warlock' },
          { result: 'win', as: 'Rogue', against: 'Warlock' },
          { result: 'win', as: 'Rogue', against: 'Mage' } ],
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
    flipit = {
      isEnabled: sandbox.stub().returns(false)
    };
    generateSummary(result, wC, flipit).then(() => {
      expect(wC.send).to.have.been.calledWith('ping', expected);
      done();
    }).catch((err) => {
      expect(err).to.be.undefined;
      done();
    });

  });
  describe('DataScript', () => {
    it('calls send when the summary is generated', (done) => {
      const expected = {
        summaryStats:
          [ { id: 1, label: 'Wins', text: '5' },
            { id: 2, label: 'Losses', text: '2' },
            { id: 3, label: 'Ratio', text: '71.42857142857143%' } ],
        winStreak:
          [ { result: 'win', as: 'Rogue', against: 'Shaman' },
            { result: 'win', as: 'Druid', against: 'Shaman' },
            { result: 'win', as: 'Priest', against: 'Shaman' },
            { result: 'loss', as: 'Rogue', against: 'Warlock' },
            { result: 'win', as: 'Rogue', against: 'Warlock' } ],
        matchBreakdown:
        [
          // {
          //   status: 'wins',
          //   outcomes: [ { class: 'Rogue', total: 3, percentage: '60%' },
          //     { class: 'Priest', total: 1, percentage: '20%' },
          //     { class: 'Druid', total: 1, percentage: '20%' }
          //   ]
          // },
          // {
          //   status: 'losses',
          //   outcomes: [ { class: 'Rogue', total: 1, percentage: '50%' },
          //     { class: 'Warlock', total: 1, percentage: '50%' }
          //   ]
          // }
        ]
      };
      flipit = {
        isEnabled: sandbox.stub().returns(true)
      };
      generateSummary(result, wC, flipit).then(() => {
        expect(wC.send).to.have.been.calledWith('ping', expected);
        done();
      }).catch((err) => {
        expect(err).to.be.undefined;
        done();
      });
    });
  });
});
