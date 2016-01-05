/*eslint-disable no-console */ 
var LogWatcher = require('hearthstone-log-watcher');
var logWatcher = new LogWatcher();

logWatcher.on('game-start', function (data) {
  console.log('Game started!');
  console.log('=======================');
  console.log(data);
});

logWatcher.on('game-over', function (data) {
  console.log('Game ended!');
  console.log('=======================');
  console.log(data);
});

logWatcher.on('zone-change', function (data) {
  console.log(data);
  console.log(data.cardName + ' has moved from ' + data.fromTeam + ' ' + data.fromZone + ' to ' + data.toTeam + ' ' + data.toZone);
});

logWatcher.start();
