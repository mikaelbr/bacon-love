module.exports = function (Bacon, riverFlow, inCriticalMode, isOnBreak, isSingleGate, systemActive, riverFlowLimit) {

  var shouldReallyNotify = systemActive.and(isSingleGate).or(inCriticalMode).and(isOnBreak.not()).toProperty();
  var isTooMuchWater = riverFlow.map(function (val) {
      return val > riverFlowLimit;
    }).toProperty();

  return isTooMuchWater.and(shouldReallyNotify);
};