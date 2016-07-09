module.exports = (Bacon, riverQuality, untilSwitchTurnedOff, sampleTime) =>
    riverQuality
        .debounceImmediate(sampleTime)
        .takeWhile(untilSwitchTurnedOff);