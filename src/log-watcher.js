import { mori } from 'datascript-mori';
import { parseFriendlyPlayer, parsePlayerById, extractPlayerName } from './parse-friendly-player';
import { resetData, setWinCondition, setMatchId, setForPlayerName, setAgainstPlayerName,
  setStartTime, setEndTime, setHeroValues } from './match-data-manipulation';
import { winCondition as hasWon } from './win-condition';

const { assoc, conj, first, get, getIn, toClj, toJs } = mori;

let [dataStructure, matchLog] = resetData();

//TODO: write a test to cover this
const fixStartTime = (dataStructure) => {
  return assoc(dataStructure, 'startTime', get(first(get(dataStructure, 'log')), 'id'));
};

export const dataLogger = (logWatcher, db, winston) => {

  logWatcher.on('game-start', () => {
    dataStructure = setMatchId(dataStructure);
    dataStructure = setStartTime(dataStructure);
    winston.info('game start: %s', get(dataStructure, '_id'));
  });

  logWatcher.on('game-over', (data) => {
    var winCondition;
    dataStructure = assoc(dataStructure, 'log', matchLog);

    if(!get(dataStructure, '_id')) {
      winston.info('no game start event');
      winston.info(parsePlayerById(data, getIn(dataStructure, ['for', 'id'])));
      winston.info(hasWon(parsePlayerById(data, getIn(dataStructure, ['for', 'id']))));
      dataStructure = setMatchId(dataStructure);
      dataStructure = fixStartTime(dataStructure);
      winCondition = hasWon(parsePlayerById(data, getIn(dataStructure, ['for', 'id'])));
    } else {
      winston.info('game started event');
      winston.info(parseFriendlyPlayer(data));
      winston.info(hasWon(parseFriendlyPlayer(data)));
      winCondition = hasWon(parseFriendlyPlayer(data));
    }
    dataStructure = setWinCondition(dataStructure, winCondition);
    dataStructure = setForPlayerName(dataStructure, extractPlayerName(data, getIn(dataStructure, ['for', 'id'])));
    dataStructure = setAgainstPlayerName(dataStructure, extractPlayerName(data, getIn(dataStructure, ['against', 'id'])));
    dataStructure = setEndTime(dataStructure);

    db.put(toJs(dataStructure))
      .then(() => {
        [dataStructure, matchLog] = resetData();
      }).catch((error) => {
        winston.info(error);
      });
  });

  logWatcher.on('zone-change', (data) => {
    dataStructure = setHeroValues(dataStructure, data);
    data.id = Date.now();
    matchLog = conj(matchLog, toClj(data));
  });

  return logWatcher;
};
