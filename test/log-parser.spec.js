import { expect } from 'chai';
import parsePlayer from '../app/scripts/parse-player';
import isMyHero from '../app/scripts/is-my-hero';
import findClass from '../app/scripts/find-class';
import hasWon from '../app/scripts/win-condition';

describe('Parse HS log file', () => {
  describe('on game start', () => {
    it('returns the friendly player', () => {
      let sample = [ { name: 'artaios', id: 2, team: 'FRIENDLY' },
        { name: 'Poopfist', id: 1, team: 'OPPOSING' } ];
      let friendly = parsePlayer(sample);

      expect(friendly).to.deep.equal(sample[0]);
    });

    describe('find my hero', () => {
      it('is my hero\'s card', () => {
        let sample = { cardName: 'Uther Lightbringer',
          entityId: 66,
          cardId: 'HERO_04',
          playerId: 2,
          fromTeam: undefined,
          fromZone: undefined,
          toTeam: 'FRIENDLY',
          toZone: 'PLAY (Hero)' };

        expect(isMyHero(sample)).to.be.true;
      });

      it('is not my hero\'s card', () => {
        let sample = { cardName: 'Rexxar',
          entityId: 64,
          cardId: 'HERO_05',
          playerId: 1,
          fromTeam: undefined,
          fromZone: undefined,
          toTeam: 'OPPOSING',
          toZone: 'PLAY (Hero)' };

        expect(isMyHero(sample)).to.be.false;
      });

      it('is not a hero, card ID does not match pattern', () => {
        let sample = { cardName: 'Rexxar',
          entityId: 64,
          cardId: 'FOO_05',
          playerId: 1,
          fromTeam: undefined,
          fromZone: undefined,
          toTeam: 'OPPOSING',
          toZone: 'PLAY (Hero)' };

        expect(isMyHero(sample)).to.be.false;
      });
    });

    describe('find class', () => {
      it('returns the class for a given hero name', () => {
        expect(findClass('Uther Lightbringer')).to.equal('Paladin');
        expect(findClass('Rexxar')).to.equal('Hunter');
        expect(findClass('Alleria Windrunner')).to.equal('Hunter');
        expect(findClass('Garrosh Hellscream')).to.equal('Warrior');
        expect(findClass('Magni Bronzebeard')).to.equal('Warrior');
        expect(findClass('Jaina Proudmoore')).to.equal('Mage');
        expect(findClass('Medivh')).to.equal('Mage');
        expect(findClass('Thrall')).to.equal('Shaman');
        expect(findClass('Anduin Wrynn')).to.equal('Priest');
        expect(findClass('Gul\'dan')).to.equal('Warlock');
        expect(findClass('Malfurion Stormrage')).to.equal('Druid');
      });
    });
  });

  //TODO: zone-change;

  describe('on game end', () => {
    describe('win condition', () => {
      it('returns a win', () => {
        let sample = [ { name: 'artaios', id: 2, team: 'FRIENDLY', status: 'WON' },
        { name: 'Poopfist', id: 1, team: 'OPPOSING', status: 'LOST' } ];

        expect(hasWon(parsePlayer(sample))).to.be.true;
      });

      it('returns a loss', () => {
        let sample = [ { name: 'artaios', id: 2, team: 'FRIENDLY', status: 'LOST' },
        { name: 'Poopfist', id: 1, team: 'OPPOSING', status: 'WON' } ];

        expect(hasWon(parsePlayer(sample))).to.be.false;
      });
    });
  });
});
