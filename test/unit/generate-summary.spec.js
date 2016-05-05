import { generateSummary } from '../../src/ui-data/generate-summary';
import { result } from '../fixtures/database-result';
import chai from 'chai';
import debug from 'debug';
import sinon from 'sinon';
import sinonAsPromised from 'sinon-as-promised';

chai.use(require('sinon-chai'));
const expect = chai.expect;

describe('Generate Summary', () => {
  let db, wC, sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    db = {
      allDocs: sandbox.stub()
    };
    wC = {
      send: sandbox.spy()
    };

    db.allDocs.resolves(result);
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
        { result: 'win', as: 'Priest', against: 'Shaman' },
        { result: 'loss', as: 'Rogue', against: 'Warlock' },
        { result: 'win', as: 'Rogue', against: 'Warlock' },
        { result: 'win', as: 'Rogue', against: 'Mage' },
        { result: 'loss', as: 'Rogue', against: 'Rogue' } ],
      matchBreakdown:
        {
          wins:
          [ { class: 'Rogue', total: 3, percentage: '60%' },
            { class: 'Priest', total: 1, percentage: '20%' },
            { class: 'Druid', total: 1, percentage: '20%' }
          ],
          losses:
          [ { class: 'Rogue', total: 1, percentage: '50%' },
            { class: 'Warlock', total: 1, percentage: '50%' }
          ]
        }
    };
    generateSummary(db, wC).then(() => {
      expect(wC.send).to.have.been.calledWith('ping', expected);
      done();
    }).catch((err) => {
      console.log(err);
      expect(err).to.be.undefined;
      done();
    });
  });
});
