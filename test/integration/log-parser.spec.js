import LogWatcher from 'hearthstone-log-watcher';
import {goodParse, missingStartEventParse} from '../fixtures/data-parses';
import {dataLogger, getDatabase} from '../../src/log-watcher';

import chai from 'chai';
import sinon from 'sinon';
import Promise from 'bluebird';
chai.use(require('sinon-chai'));
const expect = chai.expect;

describe('Parse HS log file', () => {
  let logWatcher, sandbox, logData;
  before(() => {
    sandbox = sinon.sandbox.create();
    const options = {
      logFile: './test/fixtures/Player.log',
      configFile: './test/fixtures/log.config'
    };
    let watcher = new LogWatcher(options);

    logWatcher = dataLogger(watcher);
    sandbox.spy(logWatcher, "on");
  });

  after(() => {
    sandbox.restore();
  });

  describe('We have a good parse', () => {
    beforeEach(() => {
      logData = goodParse;
    });

    it('returns a database with a complete record for the match', () => {
      const OFF_SET = 3;
      const applyData = () => {
        return new Promise((resolve) => {
          logData.map((element) => {
            logWatcher.emit(element.event, element.data);
          });
          return resolve();
        });
      };

      applyData().then(() => {
        expect(getDatabase()[0].matchId).to.be.a.number;
        expect(getDatabase()[0].for).to.equal('Hunter');
        expect(getDatabase()[0].against).to.equal('Shaman');
        expect(getDatabase()[0].log.length).to.equal(logData.length-OFF_SET);
        expect(getDatabase()[0].hasWon).to.be.true;
      }).catch((err) => {
        expect(err).to.be.undefined;
      });
    });
  });

  describe('We have a parse with a missing start event', () => {
    beforeEach(() => {
      logData = missingStartEventParse;
    });

    it('returns a database with a complete record for the match', () => {
      const OFF_SET = 1;
      const applyData = () => {
        return new Promise((resolve) => {
          logData.map((element) => {
            logWatcher.emit(element.event, element.data);
          });
          return resolve();
        });
      };

      applyData().catch((err) => {
        expect(err).to.be.undefined;
      }).then(() => {
        expect(getDatabase()[1].matchId).to.be.a.number;
        expect(getDatabase()[1].for).to.equal('Hunter');
        expect(getDatabase()[1].against).to.equal('Hunter');
        expect(getDatabase()[1].log.length).to.equal(logData.length-OFF_SET);
        expect(getDatabase()[1].hasWon).to.be.false;
      });
    });
  });
});
