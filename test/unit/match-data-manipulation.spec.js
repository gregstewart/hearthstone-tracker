import { expect } from 'chai';

import { setWinCondition, logMatchData, recordOutcome, resetData, setMatchId, setFor, setAgainst } from '../../src/match-data-manipulation';

describe('Match data actions', () => {
  let logMatch, dataStructure, database;

  beforeEach(() => {
    logMatch = [];
    dataStructure = {
      matchId: "",
      for: "",
      against: "",
      log: [],
      hasWon: ""
    };
    database = [];
  });

  describe('at the started of a game', () => {
    it('sets a match id', () => {
      expect(dataStructure.matchId).to.be.empty;
      dataStructure = setMatchId(dataStructure);
      expect(dataStructure.matchId).to.be.a('number');
    });
  });

  describe('during the game', () => {
    it('sets a for value', () => {
      const value = 'Foo';
      expect(dataStructure.for).to.be.empty;
      dataStructure = setFor(dataStructure, value);
      expect(dataStructure.for).to.equal(value);
    });

    it('sets a against value', () => {
      const value = 'Fee';
      expect(dataStructure.against).to.be.empty;
      dataStructure = setAgainst(dataStructure, value);
      expect(dataStructure.against).to.equal(value);
    });
  });

  describe('at the end of a game', () => {
    it('records the win condition', () => {
      expect(dataStructure.hasWon).to.be.empty;
      dataStructure = setWinCondition(dataStructure, true);
      expect(dataStructure.hasWon).to.be.true;
    });

    it('records match data', () => {
      const matchData = [{}, {}, {}];
      expect(dataStructure.log).to.be.empty;
      dataStructure = logMatchData(dataStructure, matchData);
      expect(dataStructure.log).to.deep.equal(matchData);
    });

    it('captures the whole dataStructure in the database not as a reference', () => {
      let data = { id: 1};
      expect(database).to.be.empty;
      database = recordOutcome(database, data);
      expect(database).not.to.be.empty;
      data.id = 2;
      expect(database[0].id).to.equal(1);
    });

    it('resets our data structures', () => {
      logMatch = [{}, {}, {}];
      dataStructure = {
        matchId: 1,
        for: "Fee",
        against: "Foo",
        log: logMatch,
        hasWon: true
      };
      let { logMatch, dataStructure } = resetData();

      expect(logMatch).to.be.empty;
      expect(dataStructure.matchId).to.be.empty;
      expect(dataStructure.for).to.be.empty;
      expect(dataStructure.against).to.be.empty;
      expect(dataStructure.log).to.be.empty;
      expect(dataStructure.hasWon).to.be.empty;
    });
  });

});
