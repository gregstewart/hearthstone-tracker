import { assoc, conj, first, get, getIn, toClj, toJs } from 'mori';
import { parseFriendlyPlayer, parsePlayerById, extractPlayerName } from './parse-friendly-player';
import { resetData, setWinCondition, setMatchId, setForPlayerName, setAgainstPlayerName,
  setStartTime, setEndTime, setHeroValues } from './match-data-manipulation';
import debug from 'debug';
import hasWon from './win-condition';

let [dataStructure, matchLog] = resetData();
// Define some debug logging functions for easy and readable debug messages.
let log = {
  main: debug('HT:LV')
};

//TODO: write a test to cover this
const fixStartTime = (dataStructure) => {
  return assoc(dataStructure, 'startTime', get(first(get(dataStructure, 'log')), 'id'));
};

export function dataLogger (logWatcher, db) {

  logWatcher.on('game-start', () => {
    dataStructure = setMatchId(dataStructure);
    dataStructure = setStartTime(dataStructure);
    log.main('game start: %s', get(dataStructure, '_id'));
  });

  logWatcher.on('game-over', (data) => {
    var winCondition;
    dataStructure = assoc(dataStructure, 'log', matchLog);

    if(!get(dataStructure, '_id')) {
      log.main('no game start event');
      log.main(parsePlayerById(data, getIn(dataStructure, ['for', 'id'])));
      log.main(hasWon(parsePlayerById(data, getIn(dataStructure, ['for', 'id']))));
      dataStructure = setMatchId(dataStructure);
      dataStructure = fixStartTime(dataStructure);
      winCondition = hasWon(parsePlayerById(data, getIn(dataStructure, ['for', 'id'])));
    } else {
      log.main('game started event');
      log.main(parseFriendlyPlayer(data));
      log.main(hasWon(parseFriendlyPlayer(data)));
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
        log.main(error);
      });
  });

  logWatcher.on('zone-change', (data) => {
    dataStructure = setHeroValues(dataStructure, data);
    data.id = Date.now();
    matchLog = conj(matchLog, toClj(data));
  });

  return logWatcher;
}
