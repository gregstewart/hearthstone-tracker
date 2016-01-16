import { expect } from 'chai';

import {parseFriendlyPlayerById} from '../../src/parse-friendly-player';
import hasWon from '../../src/win-condition';

describe('Win condition', () => {
  it('returns a win', () => {
    let sample = [ { name: 'artaios', id: 2, team: 'FRIENDLY', status: 'WON' },
    { name: 'Poopfist', id: 1, team: 'OPPOSING', status: 'LOST' } ];

    expect(hasWon({ name: 'artaios', id: 2, team: 'FRIENDLY', status: 'WON' })).to.be.true;
  });

  it('returns a loss', () => {
    let sample = [ { name: 'artaios', id: 2, team: 'FRIENDLY', status: 'LOST' },
    { name: 'Poopfist', id: 1, team: 'OPPOSING', status: 'WON' } ];

    expect(hasWon({ name: 'artaios', id: 2, team: 'FRIENDLY', status: 'LOST' })).to.be.false;
  });

  // TODO: This is the result when the game start event has not fired
  // We loose the team key.
  // [ { name: 'Teknow', id: 2, status: 'LOST' },
  //   { name: 'artaios', id: 1, status: 'WON' } ]
  describe('missing team key', () => {
    it('returns a win', () => {
      const expected = {team: 'FRIENDLY', id: 1};
      const sampleOutcome = [ { name: 'Teknow', id: 2, status: 'LOST' },
        { name: 'artaios', id: 1, status: 'WON' } ];

      expect(hasWon(parseFriendlyPlayerById(sampleOutcome, expected.id))).to.be.true;
    });
  });
});
