import { expect } from 'chai';

import {isMyHero, isHeroCard, extractPlayerDetails} from '../../src/is-my-hero';

describe('Find hero', () => {
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
});
