import { keyValueChecker } from '../../../src/datascript/key-value-checker';

describe('Key Value checker', () => {
  it('fails when the item is undefined', () => {
    expect(keyValueChecker()).to.be.false;
  });

  it('fails when the item.doc is undefined', () => {
    expect(keyValueChecker({})).to.be.false;
  });

  it('fails when the item.doc.startTime is undefined', () => {
    expect(keyValueChecker({doc: {}})).to.be.false;
  });

  it('fails when the item.doc.startTime is empty', () => {
    expect(keyValueChecker({doc: {startTime: ''}})).to.be.false;
  });

  it('fails when the item.doc.for.name is undefined', () => {
    expect(keyValueChecker({doc: { for: {}}})).to.be.false;
  });

  it('fails when the item.doc.for.name is empty', () => {
    expect(keyValueChecker({doc: { for: {name: '' }}})).to.be.false;
  });

  it('passes when the item has all the right values', () => {
    const expected = {
      doc: {
        startTime: 123455,
        endTime: 123455,
        for: { name: 'foo', id: 1, class: 'wibble' },
        against: {name: 'foo', id: 1, class: 'wibble' },
        hasWon: true
      }
    };
    expect(keyValueChecker(expected)).to.be.true;
  });

});
