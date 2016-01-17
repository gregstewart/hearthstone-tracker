import LogWatcher from 'hearthstone-log-watcher';
import PouchDBWithLevelDB from 'pouchdb';
import {goodParse, missingStartEventParse} from '../fixtures/data-parses';
import {dataLogger} from '../../src/log-watcher';

import chai from 'chai';
import sinon from 'sinon';
import Promise from 'bluebird';
chai.use(require('sinon-chai'));
const expect = chai.expect;

describe.only('Parse HS log file', () => {
  let logWatcher, sandbox, logData, db;
  before(() => {
    sandbox = sinon.sandbox.create();
    const options = {
      logFile: './test/fixtures/Player.log',
      configFile: './test/fixtures/log.config'
    };
    let watcher = new LogWatcher(options);

    db = new PouchDBWithLevelDB('test-leveldb');
    logWatcher = dataLogger(watcher, db);

    sandbox.spy(logWatcher, "on");
    sandbox.spy(db, "put");
  });

  after(() => {
    sandbox.restore();
    new PouchDBWithLevelDB('test-leveldb').destroy().then(function () {
      // database destroyed
    }).catch(function (err) {
      // error occurred
    });
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
        return db.allDocs({include_docs: true});
      }).then((result) => {
        let row = result.rows[0].doc;
        expect(row.matchId).to.be.a.number;
        expect(row.for).to.equal('Hunter');
        expect(row.against).to.equal('Shaman');
        expect(row.log.length).to.equal(logData.length-OFF_SET);
        expect(row.hasWon).to.be.true;
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
        return db.allDocs({include_docs: true});
      }).then((result) => {
        let row = result.rows[1].doc;
        expect(row.matchId).to.be.a.number;
        expect(row.for).to.equal('Hunter');
        expect(row.against).to.equal('Hunter');
        expect(row.log.length).to.equal(logData.length-OFF_SET);
        expect(row.hasWon).to.be.false;
      });
    });
  });
});
