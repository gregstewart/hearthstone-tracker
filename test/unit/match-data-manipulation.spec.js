import { expect } from 'chai';
import {get, getIn, toClj, toJs} from 'mori';

import { setWinCondition, logMatchData, resetData, setMatchId,
  setForClass, setAgainstClass, setAgainstPlayerId, setForPlayerId,
  setForPlayerName, setAgainstPlayerName, setStartTime, setEndTime } from '../../src/match-data-manipulation';

describe('Match data actions', () => {
  let logMatch, dataStructure, database;

  beforeEach(() => {
    dataStructure = toClj({
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
      expect(get(dataStructure, '_id')).to.be.empty;
      dataStructure = setMatchId(dataStructure);
      expect(get(dataStructure, '_id')).not.to.be.empty;
    });

    it('sets a match start time', () => {
      expect(get(dataStructure, 'startTime')).to.be.empty;
      dataStructure = setStartTime(dataStructure);
      expect(get(dataStructure, 'startTime')).to.be.a('number');
    });
  });

  describe('during the game', () => {
    it('sets a for class', () => {
      const value = 'Foo';
      expect(getIn(dataStructure, ['for', 'class'])).to.be.empty;
      dataStructure = setForClass(dataStructure, value);
      expect(getIn(dataStructure, ['for', 'class'])).to.equal(value);
    });

    it('sets a against class', () => {
      const value = 'Fee';
      expect(getIn(dataStructure, ['against', 'class'])).to.be.empty;
      dataStructure = setAgainstClass(dataStructure, value);
      expect(getIn(dataStructure, ['against', 'class'])).to.equal(value);
    });

    it('sets for player id', () => {
      const value = 'Fee';
      expect(getIn(dataStructure, ['for', 'id'])).to.be.empty;
      dataStructure = setForPlayerId(dataStructure, value);
      expect(getIn(dataStructure, ['for', 'id'])).to.equal(value);
    });

    it('sets against player id', () => {
      const value = 'Fox';
      expect(getIn(dataStructure, ['against', 'id'])).to.be.empty;
      dataStructure = setAgainstPlayerId(dataStructure, value);
      expect(getIn(dataStructure, ['against', 'id'])).to.equal(value);
    });
  });

  describe('at the end of a game', () => {
    it('records the win condition', () => {
      expect(get(dataStructure, 'hasWon')).to.be.empty;
      dataStructure = setWinCondition(dataStructure, true);
      expect(get(dataStructure, 'hasWon')).to.be.true;
    });

    it('records match end time', () => {
      expect(get(dataStructure, 'endTime')).to.be.empty;
      dataStructure = setEndTime(dataStructure);
      expect(get(dataStructure, 'endTime')).to.be.a('number');
    });

    it('records match data', () => {
      const matchData = [{}, {}, {}];
      expect(toJs(get(dataStructure, 'log'))).to.be.empty;
      dataStructure = logMatchData(dataStructure, matchData);
      expect(get(dataStructure, 'log')).to.deep.equal(matchData);
    });

    it('records the friendly player name', () => {
      const value = 'Flox';
      expect(getIn(dataStructure, ['for', 'name'])).to.be.empty;
      dataStructure = setForPlayerName(dataStructure, value);
      expect(getIn(dataStructure, ['for', 'name'])).to.equal(value);
    });

    it('records the opponent player name', () => {
      const value = 'Fox';
      expect(getIn(dataStructure, ['against', 'name'])).to.be.empty;
      dataStructure = setAgainstPlayerName(dataStructure, value);
      expect(getIn(dataStructure, ['against', 'name'])).to.equal(value);
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

      expect(get(dataStructure, '_id')).to.be.empty;
      expect(getIn(dataStructure, ['for','id'])).to.be.empty;
      expect(getIn(dataStructure, ['for', 'class'])).to.be.empty;
      expect(getIn(dataStructure, ['against', 'id'])).to.be.empty;
      expect(getIn(dataStructure, ['against', 'class'])).to.be.empty;
      expect(toJs(get(dataStructure, 'log'))).to.be.empty;
      expect(get(dataStructure, 'hasWon')).to.be.empty;
      expect(toJs(matchLog)).to.be.empty;
    });
  });

});
