module.exports = function (Bacon, riverQuality, untilSwitchTurnedOff, sampleTime) {
  return riverQuality
              .debounceImmediate(sampleTime)
              .takeWhile(untilSwitchTurnedOff);
};