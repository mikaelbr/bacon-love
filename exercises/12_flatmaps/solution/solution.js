var Bacon = require('baconjs');

module.exports = function (riverFlowInQubicFeet, litresInQubicFeet) {
  return riverFlowInQubicFeet.flatMap(function(flowData) {
    var qubicFeet = flowData[0];
    var numberOfSamples = flowData[1];

    var litres = Math.round(qubicFeet * litresInQubicFeet);

    if (litres < 3000) {
      return Bacon.never();
    }
    return Bacon.interval(100, litres).take(numberOfSamples);
  });
};
