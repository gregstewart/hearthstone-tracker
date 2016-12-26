import { dataLogger } from '../../src/log-watcher';
import { goodParse, missingStartEventParse } from '../fixtures/data-parses';
import LogWatcher from 'farseer';
import PouchDB from 'pouchdb';
import sinon from 'sinon';

describe('Parse HS log file', () => {
  let logWatcher, sandbox, logData, db;
  before(() => {
    sandbox = sinon.sandbox.create();
    const options = {
      logFile: './test/fixtures/Player.log',
      configFile: './test/fixtures/log.config'
    };
    let watcher = new LogWatcher(options);
    let winston = {
      info: sandbox.stub()
    };
    db = new PouchDB('test-leveldb', {db : require('memdown')});
    logWatcher = dataLogger(watcher, db, winston);

    sandbox.spy(logWatcher, "on");
    sandbox.spy(db, "put");
  });

  after(() => {
    db.destroy().then(function () {
      // database destroyed
    }).catch(function (err) {
      // error occurred
    });
    sandbox.restore();
  });

  describe('We have a good parse', () => {
    beforeEach(() => {
      logData = goodParse;
    });

    it('returns a database with a complete record for the match', (done) => {
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
        expect(row._id).to.be.a('string');
        expect(row.startTime).to.be.a('number');
        expect(row.endTime).to.be.a('number');
        expect(row.for.class).to.equal('Hunter');
        expect(row.for.name).to.equal('artaios');
        expect(row.for.id).to.equal(1);
        expect(row.against.class).to.equal('Shaman');
        expect(row.against.name).to.equal('zam');
        expect(row.against.id).to.equal(2);
        expect(row.log.length).to.equal(logData.length-OFF_SET);
        expect(row.hasWon).to.be.true;
        done();
      }).catch((err) => {
        expect(err).to.be.undefined;
        done();
      });
    });
  });

  describe('We have a parse with a missing start event', () => {
    beforeEach(() => {
      logData = missingStartEventParse;
    });

    it('returns a database with a complete record for the match', (done) => {
      const OFF_SET = 2;
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
        let row = result.rows[1].doc;
        expect(row._id).to.be.a('string');
        expect(row.startTime).to.be.a('number');
        expect(row.endTime).to.be.a('number');
        expect(row.for.class).to.equal('Hunter');
        expect(row.for.name).to.equal('artaios');
        expect(row.for.id).to.equal(2);
        expect(row.against.class).to.equal('Hunter');
        expect(row.against.name).to.equal('Musashi73');
        expect(row.against.id).to.equal(1);
        expect(row.log.length).to.equal(logData.length-OFF_SET);
        expect(row.hasWon).to.be.false;
        done();
      }).catch((err) => {
        expect(err).to.be.undefined;
        done();
      });
    });
  });
});
