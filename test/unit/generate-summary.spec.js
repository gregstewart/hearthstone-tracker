import debug from 'debug';
import chai from 'chai';
import sinon from 'sinon';
chai.use(require('sinon-chai'));
import sinonAsPromised from 'sinon-as-promised';
const expect = chai.expect;

import { result } from '../fixtures/database-result';
import { generateSummary } from '../../src/ui-data/generate-summary';

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
    const expected = { summaryStats:
      [ { id: 1, label: 'Wins', text: '3' },
        { id: 2, label: 'Losses', text: '2' },
        { id: 3, label: 'Ratio', text: '60%' } ],
      winStreak:
        [ { result: 'loss', as: 'Rogue', against: 'Rogue' },
          { result: 'win', as: 'Rogue', against: 'Mage' },
          { result: 'win', as: 'Rogue', against: 'Warlock' },
          { result: 'loss', as: 'Rogue', against: 'Warlock' },
          { result: 'win', as: 'Priest', against: 'Shaman' } ] };
    generateSummary(db, wC).then(() => {
      expect(wC.send).to.have.been.calledWith('ping', expected);
      done();
    }).catch((err) => {
      expect(err).to.be.undefined;
      done();
    });
  });
});
