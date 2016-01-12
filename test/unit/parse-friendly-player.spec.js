import { expect } from 'chai';
import {parseFriendlyPlayer, parseFriendlyPlayerById} from '../../app/scripts/parse-friendly-player';

describe('Parse Friendly Player', () => {
  it('returns the friendly player', () => {
    let sample = [ { name: 'artaios', id: 2, team: 'FRIENDLY' },
      { name: 'Poopfist', id: 1, team: 'OPPOSING' } ];
    let friendly = parseFriendlyPlayer(sample);

    expect(friendly).to.deep.equal(sample[0]);
  });

  it('returns a friendly player by the ID', () => {
    let sample = [ { name: 'artaios', id: 2 },
      { name: 'Poopfist', id: 1 } ];

    expect(parseFriendlyPlayerById(sample, 2)).to.deep.equal(sample[0]);
  });
});
