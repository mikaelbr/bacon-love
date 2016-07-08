export default (Bacon, riverQuality, untilSwitchTurnedOff, sampleTime) =>
    riverQuality
        .debounceImmediate(sampleTime)
        .takeWhile(untilSwitchTurnedOff);