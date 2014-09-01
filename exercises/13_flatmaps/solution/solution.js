module.exports = function (Bacon, riverFlowInCubicFeet, litresInCubicFeet) {
  return riverFlowInCubicFeet.flatMap(function(flowData) {
    var cubicFeet = flowData[0];
    var numberOfSamples = flowData[1];

    var litres = Math.round(cubicFeet * litresInCubicFeet);

    if (litres < 200000) {
      return Bacon.never();
    }
    return Bacon.interval(100, litres).take(numberOfSamples);
  });
};
