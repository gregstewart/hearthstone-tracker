import { expect } from 'chai';
import {parseFriendlyPlayer, parsePlayerById, extractPlayerName} from '../../src/parse-friendly-player';

describe('Parse player data', () => {
  describe('Friendly Player', () => {
    it('returns the friendly player', () => {
      let sample = [ { name: 'artaios', id: 2, team: 'FRIENDLY' },
      { name: 'Poopfist', id: 1, team: 'OPPOSING' } ];
      let friendly = parseFriendlyPlayer(sample);

      expect(friendly).to.deep.equal(sample[0]);
    });

    it('returns a player by the ID', () => {
      let sample = [ { name: 'artaios', id: 2 },
      { name: 'Poopfist', id: 1 } ];

      expect(parsePlayerById(sample, 2)).to.deep.equal(sample[0]);
    });
  });

  describe('extract player name', () => {
    it('returns the player name for a given playerId', () => {
      const sample = [ { name: 'zam', id: 2, team: 'OPPOSING', status: 'LOST' },
        { name: 'artaios', id: 1, team: 'FRIENDLY', status: 'WON' }];

      expect(extractPlayerName(sample, sample[0].id)).to.equal(sample[0].name);
    });
  });
});
