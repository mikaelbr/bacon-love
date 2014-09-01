module.exports = function (Bacon, enteringShips, destroyerPosition) {
  var shipTally = enteringShips
    .filter(function (ship) {
      return ship.type === 'zrrk';
    })
    .map(1)
    .scan(0, function (acc, v) { return acc + v; });

  var destroyerHasEntered = destroyerPosition.map(function (pos) { return pos < 1; });

  var threatReport = enteringShips
    .filter(destroyerHasEntered)
    .take(5)
    .fold({}, function (report, ship) {
      if(!report[ship.type]) {
       report[ship.type] = 0;
      }
      report[ship.type] += 1;
      return report;
    });

  return {
    shipTally: shipTally,
    threatReport: threatReport
  };
};