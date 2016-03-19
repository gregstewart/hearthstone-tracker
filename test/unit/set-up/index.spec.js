import { setUpBrowserWindow } from '../../../src/set-up/browser-window';
import { setUpDatabase, watchForDBChanges } from '../../../src/set-up/db';
import { setUpLogWatcher } from '../../../src/set-up/log-watcher';
import chai from 'chai';
import sinon from 'sinon';

chai.use(require('sinon-chai'));
const expect = chai.expect;

describe('Set up', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('browser window', () => {
    let BrowserWindow;
    beforeEach(() => {
      BrowserWindow = sandbox.stub().returns({
        loadURL: sandbox.stub(),
        openDevTools: sandbox.stub()
      });
    });

    it('resolves the promise with a mainWindow object', (done) => {
      setUpBrowserWindow(BrowserWindow).then((mainWindow) => {
        expect(BrowserWindow).to.have.been.calledWithNew;
        expect(BrowserWindow).to.have.been.calledWith({
          height: 600,
          width: 800,
          icon:'./assets/16x16.png'
        });
        expect(mainWindow.loadURL).to.have.been.calledWithMatch('/app/index.html');
        expect(mainWindow.openDevTools).to.have.been.called;
        done();
      }).catch((error) => {
        expect(error).to.be.undefined;
        done();
      });
    });
  });

  describe('database', () => {
    let PouchDB;
    let changes;

    beforeEach(() => {
      changes = sandbox.stub().returns({on: sandbox.stub().returns({on: sandbox.stub()})});
      PouchDB = sandbox.stub().returns({
        changes: changes
      });
    });

    it('resolves the promise with a database object', (done) => {
      setUpDatabase(PouchDB).then(db => {
        expect(PouchDB).to.have.been.calledWithNew;
        expect(PouchDB).to.have.been.calledWith('hearthstone-tracker-leveldb', {adapter : 'leveldb'});
        done();
      }).catch((error) => {
        expect(error).to.be.undefined;
        done();
      });
    });

    it('sets up watching for database changes', () => {
      let db = new PouchDB();
      db = watchForDBChanges(db, {}, () => {}, {});

      expect(changes).to.have.been.calledWith({
        since: 'now',
        live: true,
        include_docs: true
      });
    });
  });

  describe('log watcher', () => {
    let LogWatcher;

    beforeEach(() => {
      LogWatcher = sandbox.stub().returns({});
    });

    it('resolves the promise with a log watcher object', (done) => {
      setUpLogWatcher(LogWatcher).then(logWatcher => {
        expect(LogWatcher).to.have.been.calledWithNew;
        done();
      }).catch(error => {
        expect(error).to.be.undefined;
        done();
      });
    });
  });
});
