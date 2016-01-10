const FRIENDLY = 'FRIENDLY';
const HERO_ZONE = 'PLAY (Hero)';
const HERO_PATTERN = /HERO_/;

const belongsToFriendlyTeam = (toTeam) => {
  return toTeam && toTeam === FRIENDLY;
};

const hasHeroPattern = (cardId) => {
  return HERO_PATTERN.test(cardId);
};

const isInHeroZone = (toZone) => {
  return toZone && toZone === HERO_ZONE;
};

export function isMyHero (card) {
  return belongsToFriendlyTeam(card.toTeam) && isHeroCard(card);
}

export function isHeroCard (card) {
  return hasHeroPattern(card.cardId) && isInHeroZone(card.toZone);
}

export function extractPlayerDetails (card) {
  return {
    team: card.toTeam,
    id: card.playerId
  };
}
