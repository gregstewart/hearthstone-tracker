import { expect } from 'chai';
import mori from 'mori';

import { setWinCondition, logMatchData, recordOutcome, resetData, setMatchId,
  setForClass, setAgainstClass, setAgainstPlayerId, setForPlayerId,
  setForPlayerName, setAgainstPlayerName, setStartTime, setEndTime } from '../../src/match-data-manipulation';

describe('Match data actions', () => {
  let logMatch, dataStructure, database;

  beforeEach(() => {
    dataStructure = mori.toClj({
      _id: '',
      startTime: '',
      endTime: '',
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
      hasWon: ''
    });
    database = [];
  });

  describe('at the started of a game', () => {
    it('sets a match id', () => {
      expect(mori.get(dataStructure, '_id')).to.be.empty;
      dataStructure = setMatchId(dataStructure);
      expect(mori.get(dataStructure, '_id')).not.to.be.empty;
    });

    it('sets a match start time', () => {
      expect(mori.get(dataStructure, 'startTime')).to.be.empty;
      dataStructure = setStartTime(dataStructure);
      expect(mori.get(dataStructure, 'startTime')).to.be.a('number');
    });
  });

  describe('during the game', () => {
    it('sets a for class', () => {
      const value = 'Foo';
      expect(mori.getIn(dataStructure, ['for', 'class'])).to.be.empty;
      dataStructure = setForClass(dataStructure, value);
      expect(mori.getIn(dataStructure, ['for', 'class'])).to.equal(value);
    });

    it('sets a against class', () => {
      const value = 'Fee';
      expect(mori.getIn(dataStructure, ['against', 'class'])).to.be.empty;
      dataStructure = setAgainstClass(dataStructure, value);
      expect(mori.getIn(dataStructure, ['against', 'class'])).to.equal(value);
    });

    it('sets for player id', () => {
      const value = 'Fee';
      expect(mori.getIn(dataStructure, ['for', 'id'])).to.be.empty;
      dataStructure = setForPlayerId(dataStructure, value);
      expect(mori.getIn(dataStructure, ['for', 'id'])).to.equal(value);
    });

    it('sets against player id', () => {
      const value = 'Fox';
      expect(mori.getIn(dataStructure, ['against', 'id'])).to.be.empty;
      dataStructure = setAgainstPlayerId(dataStructure, value);
      expect(mori.getIn(dataStructure, ['against', 'id'])).to.equal(value);
    });
  });

  describe('at the end of a game', () => {
    it('records the win condition', () => {
      expect(mori.get(dataStructure, 'hasWon')).to.be.empty;
      dataStructure = setWinCondition(dataStructure, true);
      expect(mori.get(dataStructure, 'hasWon')).to.be.true;
    });

    it('records match end time', () => {
      expect(mori.get(dataStructure, 'endTime')).to.be.empty;
      dataStructure = setEndTime(dataStructure);
      expect(mori.get(dataStructure, 'endTime')).to.be.a('number');
    });

    it('records match data', () => {
      const matchData = [{}, {}, {}];
      expect(mori.toJs(mori.get(dataStructure, 'log'))).to.be.empty;
      dataStructure = logMatchData(dataStructure, matchData);
      expect(mori.get(dataStructure, 'log')).to.deep.equal(matchData);
    });

    it('records the friendly player name', () => {
      const value = 'Flox';
      expect(mori.getIn(dataStructure, ['for', 'name'])).to.be.empty;
      dataStructure = setForPlayerName(dataStructure, value);
      expect(mori.getIn(dataStructure, ['for', 'name'])).to.equal(value);
    });

    it('records the opponent player name', () => {
      const value = 'Fox';
      expect(mori.getIn(dataStructure, ['against', 'name'])).to.be.empty;
      dataStructure = setAgainstPlayerName(dataStructure, value);
      expect(mori.getIn(dataStructure, ['against', 'name'])).to.equal(value);
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
      let [dataStructure, matchLog] = resetData();

      expect(mori.get(dataStructure, '_id')).to.be.empty;
      expect(mori.getIn(dataStructure, ['for','id'])).to.be.empty;
      expect(mori.getIn(dataStructure, ['for', 'class'])).to.be.empty;
      expect(mori.getIn(dataStructure, ['against', 'id'])).to.be.empty;
      expect(mori.getIn(dataStructure, ['against', 'class'])).to.be.empty;
      expect(mori.toJs(mori.get(dataStructure, 'log'))).to.be.empty;
      expect(mori.get(dataStructure, 'hasWon')).to.be.empty;
      expect(mori.toJs(matchLog)).to.be.empty;
    });
  });

});
