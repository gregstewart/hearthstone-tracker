import chai from 'chai';
import sinonChai from 'sinon-chai';
import 'babel-polyfill';

chai.use(sinonChai);

global.expect = chai.expect;
