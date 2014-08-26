var Bacon = require('baconjs');

module.exports = function (riverQuality, untilSwitchTurnedOff, sampleTime) {

  return riverQuality
              .debounceImmediate(sampleTime)
              .takeWhile(untilSwitchTurnedOff);
};