var Bacon = require('baconjs');

module.exports = function (riverFlow, untilSwitchTurnedOff, sampleTime) {
  return riverFlow.debounceImmediate(sampleTime).takeWhile(untilSwitchTurnedOff);
};