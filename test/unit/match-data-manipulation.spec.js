import { expect } from 'chai';

import { setWinCondition, logMatchData, recordOutcome, resetData, setMatchId,
  setForClass, setAgainstClass, setAgainstPlayerId, setForPlayerId,
  setForPlayerName, setAgainstPlayerName, setStartTime, setEndTime } from '../../src/match-data-manipulation';

describe('Match data actions', () => {
  let logMatch, dataStructure, database;

  beforeEach(() => {
    dataStructure = {
      _id: "",
      startTime: "",
      endTime: "",
      for: {
        name: '',
        id: '',
        class: ''
      },
      against: {
        name: '',
        id: '',
        class: ''
      },
      log: [],
      hasWon: ""
    };
    database = [];
  });

  describe('at the started of a game', () => {
    it('sets a match id', () => {
      expect(dataStructure._id).to.be.empty;
      dataStructure = setMatchId(dataStructure);
      expect(dataStructure._id).to.be.a.number;
    });

    it('sets a match start time', () => {
      expect(dataStructure.startTime).to.be.empty;
      dataStructure = setStartTime(dataStructure);
      expect(dataStructure.startTime).to.be.a.number;
    });
  });

  describe('during the game', () => {
    it('sets a for class', () => {
      const value = 'Foo';
      expect(dataStructure.for.class).to.be.empty;
      dataStructure = setForClass(dataStructure, value);
      expect(dataStructure.for.class).to.equal(value);
    });

    it('sets a against class', () => {
      const value = 'Fee';
      expect(dataStructure.against.class).to.be.empty;
      dataStructure = setAgainstClass(dataStructure, value);
      expect(dataStructure.against.class).to.equal(value);
    });

    it('sets for player id', () => {
      const value = 'Fee';
      expect(dataStructure.for.id).to.be.empty;
      dataStructure = setForPlayerId(dataStructure, value);
      expect(dataStructure.for.id).to.equal(value);
    });

    it('sets against player id', () => {
      const value = 'Fox';
      expect(dataStructure.against.id).to.be.empty;
      dataStructure = setAgainstPlayerId(dataStructure, value);
      expect(dataStructure.against.id).to.equal(value);
    });
  });

  describe('at the end of a game', () => {
    it('records the win condition', () => {
      expect(dataStructure.hasWon).to.be.empty;
      dataStructure = setWinCondition(dataStructure, true);
      expect(dataStructure.hasWon).to.be.true;
    });

    it('records match end time', () => {
      expect(dataStructure.endTime).to.be.empty;
      dataStructure = setEndTime(dataStructure);
      expect(dataStructure.endTime).to.be.a.number;
    });

    it('records match data', () => {
      const matchData = [{}, {}, {}];
      expect(dataStructure.log).to.be.empty;
      dataStructure = logMatchData(dataStructure, matchData);
      expect(dataStructure.log).to.deep.equal(matchData);
    });

    it('records the friendly player name', () => {
      const value = 'Flox';
      expect(dataStructure.for.name).to.be.empty;
      dataStructure = setForPlayerName(dataStructure, value);
      expect(dataStructure.for.name).to.equal(value);
    });

    it('records the opponent player name', () => {
      const value = 'Fox';
      expect(dataStructure.against.name).to.be.empty;
      dataStructure = setAgainstPlayerName(dataStructure, value);
      expect(dataStructure.against.name).to.equal(value);
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
        _id: 1,
        for: {},
        against: {},
        log: logMatch,
        hasWon: true
      };
      let dataStructure = resetData();

      expect(dataStructure._id).to.be.empty;
      expect(dataStructure.for.id).to.be.empty;
      expect(dataStructure.for.class).to.be.empty;
      expect(dataStructure.against.id).to.be.empty;
      expect(dataStructure.against.class).to.be.empty;
      expect(dataStructure.log).to.be.empty;
      expect(dataStructure.hasWon).to.be.empty;
    });
  });

});
