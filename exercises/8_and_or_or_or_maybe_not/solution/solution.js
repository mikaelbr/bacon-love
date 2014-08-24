var Bacon = require('baconjs');

module.exports = function (cubicFlow, inCriticalMode, isOnBreak, isRiverFlowing, shouldBother, riverFlowLimit) {

  var shouldReallyNotify = shouldBother.and(isRiverFlowing).or(inCriticalMode).and(isOnBreak.not()).toProperty();
  var isTooMuchWater = cubicFlow.map(function (val) {
      return val > riverFlowLimit;
    }).toProperty();

  return isTooMuchWater.and(shouldReallyNotify);
};