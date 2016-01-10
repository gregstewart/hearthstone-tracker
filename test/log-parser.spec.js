import { expect } from 'chai';
import {parseFriendlyPlayer, parseFriendlyPlayerById} from '../app/scripts/parse-friendly-player';
import {isMyHero, isHeroCard, extractPlayerDetails} from '../app/scripts/is-my-hero';
import findClass from '../app/scripts/find-class';
import hasWon from '../app/scripts/win-condition';

describe('Parse HS log file', () => {
  describe('on game start', () => {
    it('returns the friendly player', () => {
      let sample = [ { name: 'artaios', id: 2, team: 'FRIENDLY' },
        { name: 'Poopfist', id: 1, team: 'OPPOSING' } ];
      let friendly = parseFriendlyPlayer(sample);

      expect(friendly).to.deep.equal(sample[0]);
    });

    describe('find hero', () => {
      it('is a hero card', () => {
        let sample = { cardName: 'Rexxar',
          entityId: 64,
          cardId: 'FOO_05',
          playerId: 1,
          fromTeam: undefined,
          fromZone: undefined,
          toTeam: 'OPPOSING',
          toZone: 'PLAY (Hero)' };

        expect(isHeroCard(sample)).to.be.false;
      });

      it('is not a hero card, card ID does not match pattern', () => {
        let sample = { cardName: 'Houndmaster',
          entityId: 13,
          cardId: 'DS1_070',
          playerId: 1,
          fromTeam: 'OPPOSING',
          fromZone: 'PLAY',
          toTeam: 'OPPOSING',
          toZone: 'GRAVEYARD' };

        expect(isHeroCard(sample)).to.be.false;
      });

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
  describe('on zone change', () => {
    // TODO: Add test and code for handling the scenario where the start event
    // is not fired and we have to figure who we are ourselves from the hero cards
    // means we should adopt a different data structure
    it('returns identifiable player properties for a hero card', () => {
      const sample = { cardName: 'Uther Lightbringer',
        entityId: 66,
        cardId: 'HERO_04',
        playerId: 2,
        fromTeam: undefined,
        fromZone: undefined,
        toTeam: 'FRIENDLY',
        toZone: 'PLAY (Hero)' };
      const expected = {team: 'FRIENDLY', id: 2};

      expect(extractPlayerDetails(sample)).to.deep.equal(expected);
    });

    it('returns a friendly player by the ID', () => {
      let sample = [ { name: 'artaios', id: 2 },
        { name: 'Poopfist', id: 1 } ];

      expect(parseFriendlyPlayerById(sample, 2)).to.deep.equal(sample[0]);
    });
  });


  describe('on game end', () => {
    describe('win condition', () => {
      it('returns a win', () => {
        let sample = [ { name: 'artaios', id: 2, team: 'FRIENDLY', status: 'WON' },
        { name: 'Poopfist', id: 1, team: 'OPPOSING', status: 'LOST' } ];

        expect(hasWon(parseFriendlyPlayer(sample))).to.be.true;
      });

      it('returns a loss', () => {
        let sample = [ { name: 'artaios', id: 2, team: 'FRIENDLY', status: 'LOST' },
        { name: 'Poopfist', id: 1, team: 'OPPOSING', status: 'WON' } ];

        expect(hasWon(parseFriendlyPlayer(sample))).to.be.false;
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
  });
});
