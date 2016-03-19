import { setUpBrowserWindow } from '../../../src/set-up/browser-window';
import chai from 'chai';
import sinon from 'sinon';

chai.use(require('sinon-chai'));
const expect = chai.expect;

describe('Set up browser window', () => {
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
