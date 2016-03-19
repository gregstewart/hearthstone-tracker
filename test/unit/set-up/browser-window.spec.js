import { setUpBrowserWindow } from '../../../src/set-up/browser-window';
import chai from 'chai';
import debug from 'debug';
import sinon from 'sinon';
import sinonAsPromised from 'sinon-as-promised';

chai.use(require('sinon-chai'));
const expect = chai.expect;

describe('set up browser window', () => {
  let sandbox;
  let BrowserWindow;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    BrowserWindow = sandbox.stub().returns({
      loadURL: sandbox.stub(),
      openDevTools: sandbox.stub()
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('resolves the promise with a mainWindow object', (done) => {
    setUpBrowserWindow(BrowserWindow).then((mainWindow) => {
      expect(mainWindow.loadURL).to.have.been.called;
      expect(mainWindow.openDevTools).to.have.been.called;
      done();
    }).catch((error) => {
      expect(error).to.be.undefined;
      done();
    });
  });
});
