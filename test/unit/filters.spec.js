import { expect } from 'chai';
import { result } from '../fixtures/database-result';
import { byWinCondition } from '../../src/ui-data/filters';
import { mori } from 'datascript-mori';

const { count, toClj } = mori;

describe('Filters', () => {
  it('returns winners', () => {
    const winners = byWinCondition(toClj(result.rows), true);

    expect(count(winners)).to.equal(5);
  });

  it('returns losses', () => {
    const losses = byWinCondition(toClj(result.rows), false);

    expect(count(losses)).to.equal(2);
  });
});
