export const goodParse = [
  { event: 'zone-change',
  data: { cardName: 'Eaglehorn Bow',
    entityId: 13,
    cardId: 'EX1_536',
    playerId: 1,
    fromTeam: undefined,
    fromZone: undefined,
    toTeam: 'FRIENDLY',
    toZone: 'HAND' }},
  { event: 'zone-change',
  data: { cardName: 'Dr. Boom',
    entityId: 19,
    cardId: 'GVG_110',
    playerId: 1,
    fromTeam: undefined,
    fromZone: undefined,
    toTeam: 'FRIENDLY',
    toZone: 'HAND' }},
  { event: 'zone-change',
  data: { cardName: 'Animal Companion',
    entityId: 31,
    cardId: 'NEW1_031',
    playerId: 1,
    fromTeam: undefined,
    fromZone: undefined,
    toTeam: 'FRIENDLY',
    toZone: 'HAND' }},
  { event: 'zone-change',
  data: { cardName: 'Rexxar',
    entityId: 64,
    cardId: 'HERO_05',
    playerId: 1,
    fromTeam: undefined,
    fromZone: undefined,
    toTeam: 'FRIENDLY',
    toZone: 'PLAY (Hero)' }},
  { event: 'zone-change',
  data: { cardName: 'Steady Shot',
    entityId: 65,
    cardId: 'DS1h_292',
    playerId: 1,
    fromTeam: undefined,
    fromZone: undefined,
    toTeam: 'FRIENDLY',
    toZone: 'PLAY (Hero Power)' }},
  { event: 'zone-change',
  data: { cardName: 'Thrall',
    entityId: 66,
    cardId: 'HERO_02',
    playerId: 2,
    fromTeam: undefined,
    fromZone: undefined,
    toTeam: 'OPPOSING',
    toZone: 'PLAY (Hero)' }},
  { event: 'game-start',
  data: [ { name: 'zam', id: 2, team: 'OPPOSING' },
    { name: 'artaios', id: 1, team: 'FRIENDLY' } ]},
  { event: 'zone-change',
  data: { cardName: 'Totemic Call',
    entityId: 67,
    cardId: 'CS2_049',
    playerId: 2,
    fromTeam: undefined,
    fromZone: undefined,
    toTeam: 'OPPOSING',
    toZone: 'PLAY (Hero Power)' }},
  { event: 'zone-change',
  data: { cardName: 'Freezing Trap',
    entityId: 6,
    cardId: 'EX1_611',
    playerId: 1,
    fromTeam: 'FRIENDLY',
    fromZone: 'DECK',
    toTeam: 'FRIENDLY',
    toZone: 'HAND' }},
  { event: 'zone-change',
  data: { cardName: 'Dr. Boom',
    entityId: 19,
    cardId: 'GVG_110',
    playerId: 1,
    fromTeam: 'FRIENDLY',
    fromZone: 'HAND',
    toTeam: 'FRIENDLY',
    toZone: 'DECK' }},
  { event: 'zone-change',
  data: { cardName: 'Webspinner',
    entityId: 32,
    cardId: 'FP1_011',
    playerId: 1,
    fromTeam: 'FRIENDLY',
    fromZone: 'HAND',
    toTeam: 'FRIENDLY',
    toZone: 'PLAY' }},
  { event: 'zone-change',
  data: { cardName: 'Webspinner',
    entityId: 15,
    cardId: 'FP1_011',
    playerId: 1,
    fromTeam: 'FRIENDLY',
    fromZone: 'DECK',
    toTeam: 'FRIENDLY',
    toZone: 'HAND' }},
  { event: 'game-over',
  data: [ { name: 'zam', id: 2, team: 'OPPOSING', status: 'LOST' },
    { name: 'artaios', id: 1, team: 'FRIENDLY', status: 'WON' }]},
  { event: 'zone-change',
  data: { cardName: 'Thrall',
    entityId: 66,
    cardId: 'HERO_02',
    playerId: 2,
    fromTeam: 'OPPOSING',
    fromZone: 'PLAY (Hero)',
    toTeam: 'OPPOSING',
    toZone: 'GRAVEYARD' }}
];

export const missingStartEventParse = [
  { event: 'zone-change',
  data: { cardName: 'Animal Companion',
    entityId: 38,
    cardId: 'NEW1_031',
    playerId: 2,
    fromTeam: undefined,
    fromZone: undefined,
    toTeam: 'FRIENDLY',
    toZone: 'HAND' }},
  { event: 'zone-change',
  data: { cardName: 'Piloted Shredder',
    entityId: 44,
    cardId: 'GVG_096',
    playerId: 2,
    fromTeam: undefined,
    fromZone: undefined,
    toTeam: 'FRIENDLY',
    toZone: 'HAND' }},
  { event: 'zone-change',
  data: { cardName: 'Unleash the Hounds',
    entityId: 51,
    cardId: 'EX1_538',
    playerId: 2,
    fromTeam: undefined,
    fromZone: undefined,
    toTeam: 'FRIENDLY',
    toZone: 'HAND' }},
  { event: 'zone-change',
  data: { cardName: 'Rexxar',
    entityId: 64,
    cardId: 'HERO_05',
    playerId: 1,
    fromTeam: undefined,
    fromZone: undefined,
    toTeam: 'OPPOSING',
    toZone: 'PLAY (Hero)' }},
  { event: 'zone-change',
  data: { cardName: 'Steady Shot',
    entityId: 65,
    cardId: 'DS1h_292',
    playerId: 1,
    fromTeam: undefined,
    fromZone: undefined,
    toTeam: 'OPPOSING',
    toZone: 'PLAY (Hero Power)'}},
  { event: 'zone-change',
  data: { cardName: 'Rexxar',
    entityId: 66,
    cardId: 'HERO_05',
    playerId: 2,
    fromTeam: undefined,
    fromZone: undefined,
    toTeam: 'FRIENDLY',
    toZone: 'PLAY (Hero)' }},
  { event: 'zone-change',
  data: { cardName: 'Steady Shot',
    entityId: 67,
    cardId: 'DS1h_292',
    playerId: 2,
    fromTeam: undefined,
    fromZone: undefined,
    toTeam: 'FRIENDLY',
    toZone: 'PLAY (Hero Power)' }},
  { event: 'zone-change',
  data: { cardName: 'Webspinner',
    entityId: 52,
    cardId: 'FP1_011',
    playerId: 2,
    fromTeam: 'FRIENDLY',
    fromZone: 'DECK',
    toTeam: 'FRIENDLY',
    toZone: 'HAND' }},
  { event: 'zone-change',
  data: { cardName: 'Unleash the Hounds',
    entityId: 51,
    cardId: 'EX1_538',
    playerId: 2,
    fromTeam: 'FRIENDLY',
    fromZone: 'HAND',
    toTeam: 'FRIENDLY',
    toZone: 'DECK' }},
  { event: 'zone-change',
  data: {cardName: 'Kill Command',
    entityId: 46,
    cardId: 'EX1_539',
    playerId: 2,
    fromTeam: 'FRIENDLY',
    fromZone: 'DECK',
    toTeam: 'FRIENDLY',
    toZone: 'HAND' }},
  { event: 'zone-change',
  data: { cardName: 'Webspinner',
    entityId: 52,
    cardId: 'FP1_011',
    playerId: 2,
    fromTeam: 'FRIENDLY',
    fromZone: 'HAND',
    toTeam: 'FRIENDLY',
    toZone: 'PLAY' }},
  { event: 'game-over',
  data: [ { name: 'artaios', id: 2, status: 'LOST' },
    { name: 'Musashi73', id: 1, status: 'WON' } ]},
  { event: 'zone-change',
  data: { cardName: 'Rexxar',
    entityId: 66,
    cardId: 'HERO_05',
    playerId: 2,
    fromTeam: 'FRIENDLY',
    fromZone: 'PLAY (Hero)',
    toTeam: 'FRIENDLY',
    toZone: 'GRAVEYARD' }}
];
