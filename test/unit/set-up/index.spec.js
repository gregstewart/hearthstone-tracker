import { setUpBrowserWindow } from '../../../src/set-up/browser-window';
import { setUpDatabase, watchForDBChanges, fetchData } from '../../../src/set-up/db';
import { setUpRemoteDatabase, syncData } from '../../../src/set-up/remote-db';
import { setUpLogWatcher, startLogWatcher } from '../../../src/set-up/log-watcher';
import { result } from '../../fixtures/database-result';

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

  describe('local database', () => {
    let PouchDB;
    let changes;
    let db;

    beforeEach(() => {
      db = {
        allDocs: sandbox.stub()
      };
      changes = sandbox.stub().returns({on: sandbox.stub().returns({on: sandbox.stub()})});
      PouchDB = sandbox.stub().returns({
        changes: changes
      });
      db.allDocs.resolves(result);
    });

    it('resolves the promise with a database object', (done) => {
      setUpDatabase(PouchDB).then(db => {
        expect(PouchDB).to.have.been.calledWithNew;
        expect(PouchDB).to.have.been.calledWithMatch('hearthstone-tracker-leveldb', {adapter : 'leveldb'});
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

    it('fetches data from the storage when invoked', () => {
      let db = new PouchDB();
      fetchData(db).then((data) => {
        expect(data).to.deep.equal(result);
      });
    });
  });

  describe('remote database', () => {
    let PouchDB;
    let RemotePouchDB;
    let replicate;

    beforeEach(() => {
      let on = {on: sandbox.stub().returns({on: sandbox.stub()})};
      replicate = {to: sandbox.stub().returns(on)};
      PouchDB = sandbox.stub().returns({
        replicate: replicate
      });
      RemotePouchDB = sandbox.stub().returns(on);
    });

    it('resolves the promise with a database object', (done) => {
      setUpRemoteDatabase(PouchDB).then(db => {
        expect(PouchDB).to.have.been.calledWithNew;
        expect(PouchDB).to.have.been.calledWithMatch('http://localhost:5984/hearthstone-tracker');
        done();
      }).catch((error) => {
        expect(error).to.be.undefined;
        done();
      });
    });

    it('sets up syncing data', () => {
      let db = new PouchDB();
      let remoteDB = new RemotePouchDB();
      db = syncData(db, remoteDB, {});
      expect(replicate.to).to.have.been.calledWithMatch(remoteDB);
    });
  });

  describe('log watcher', () => {
    let LogWatcher;
    let start;
    let on;

    beforeEach(() => {
      start = sandbox.spy();
      on = sandbox.stub();
      LogWatcher = sandbox.stub().returns({ on: on, start: start});
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

    it('starts the log watcher', () => {
      let watcher = new LogWatcher();
      let db = {
        put: sandbox.stub()
      };

      startLogWatcher(watcher, db, {});
      expect(on).to.have.been.calledThrice;
      expect(start).to.have.been.called;
    });
  });
});
