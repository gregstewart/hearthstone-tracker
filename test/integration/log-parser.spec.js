import LogWatcher from 'hearthstone-log-watcher';
import {dataLogger, getDatabase} from '../../src/log-watcher';

import chai from 'chai';
import sinon from 'sinon';
import Promise from 'bluebird';
chai.use(require('sinon-chai'));
const expect = chai.expect;

describe('Parse HS log file', () => {
  let logWatcher, sandbox, logData;
  before(() => {
    sandbox = sinon.sandbox.create();
    let watcher = new LogWatcher();

    logWatcher = dataLogger(watcher);
    sandbox.spy(logWatcher, "on");
  });

  after(() => {
    sandbox.restore();
  });

  describe('We have a good parse', () => {
    beforeEach(() => {
      logData = [
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
    });

    it('returns a database with a complete record for the match', () => {
      const applyData = () => {
        return new Promise((resolve) => {
          logData.map((element) => {
            logWatcher.emit(element.event, element.data);
          });
          return resolve();
        });
      };

      applyData().then(() => {
        expect(getDatabase()[0].matchId).to.be.a.number;
        expect(getDatabase()[0].for).to.equal('Hunter');
        expect(getDatabase()[0].against).to.equal('Shaman');
        expect(getDatabase()[0].log.length).to.equal(logData.length-3);
        expect(getDatabase()[0].hasWon).to.be.true;
      });
    });
  });

  describe('We have a bad parse', () => {
    beforeEach(() => {
      const log = [
        { event: 'zone-change'},
        { cardName: 'Animal Companion',
          entityId: 38,
          cardId: 'NEW1_031',
          playerId: 2,
          fromTeam: undefined,
          fromZone: undefined,
          toTeam: 'FRIENDLY',
          toZone: 'HAND' },
        { event: 'zone-change'},
        { cardName: 'Piloted Shredder',
          entityId: 44,
          cardId: 'GVG_096',
          playerId: 2,
          fromTeam: undefined,
          fromZone: undefined,
          toTeam: 'FRIENDLY',
          toZone: 'HAND' },
        { event: 'zone-change'},
        { cardName: 'Unleash the Hounds',
          entityId: 51,
          cardId: 'EX1_538',
          playerId: 2,
          fromTeam: undefined,
          fromZone: undefined,
          toTeam: 'FRIENDLY',
          toZone: 'HAND' },
        { event: 'zone-change'},
        { cardName: 'Rexxar',
          entityId: 64,
          cardId: 'HERO_05',
          playerId: 1,
          fromTeam: undefined,
          fromZone: undefined,
          toTeam: 'OPPOSING',
          toZone: 'PLAY (Hero)' },
        { event: 'zone-change'},
        { cardName: 'Steady Shot',
          entityId: 65,
          cardId: 'DS1h_292',
          playerId: 1,
          fromTeam: undefined,
          fromZone: undefined,
          toTeam: 'OPPOSING',
          toZone: 'PLAY (Hero Power)' },
        { event: 'zone-change'},
        { cardName: 'Rexxar',
          entityId: 66,
          cardId: 'HERO_05',
          playerId: 2,
          fromTeam: undefined,
          fromZone: undefined,
          toTeam: 'FRIENDLY',
          toZone: 'PLAY (Hero)' },
        { event: 'zone-change'},
        { cardName: 'Steady Shot',
          entityId: 67,
          cardId: 'DS1h_292',
          playerId: 2,
          fromTeam: undefined,
          fromZone: undefined,
          toTeam: 'FRIENDLY',
          toZone: 'PLAY (Hero Power)' },
        { event: 'zone-change'},
        { cardName: 'Webspinner',
          entityId: 52,
          cardId: 'FP1_011',
          playerId: 2,
          fromTeam: 'FRIENDLY',
          fromZone: 'DECK',
          toTeam: 'FRIENDLY',
          toZone: 'HAND' },
        { event: 'zone-change'},
        { cardName: 'Unleash the Hounds',
          entityId: 51,
          cardId: 'EX1_538',
          playerId: 2,
          fromTeam: 'FRIENDLY',
          fromZone: 'HAND',
          toTeam: 'FRIENDLY',
          toZone: 'DECK' },
        { event: 'zone-change'},
        { cardName: 'Kill Command',
          entityId: 46,
          cardId: 'EX1_539',
          playerId: 2,
          fromTeam: 'FRIENDLY',
          fromZone: 'DECK',
          toTeam: 'FRIENDLY',
          toZone: 'HAND' },
        { event: 'zone-change'},
        { cardName: 'Webspinner',
          entityId: 52,
          cardId: 'FP1_011',
          playerId: 2,
          fromTeam: 'FRIENDLY',
          fromZone: 'HAND',
          toTeam: 'FRIENDLY',
          toZone: 'PLAY' },
        { event: 'game-ended'},
        [ { name: 'artaios', id: 2, status: 'LOST' },
          { name: 'Musashi73', id: 1, status: 'WON' } ],
        { event: 'zone-change'},
        { cardName: 'Rexxar',
          entityId: 66,
          cardId: 'HERO_05',
          playerId: 2,
          fromTeam: 'FRIENDLY',
          fromZone: 'PLAY (Hero)',
          toTeam: 'FRIENDLY',
          toZone: 'GRAVEYARD' }
      ];
    });
  });
});
