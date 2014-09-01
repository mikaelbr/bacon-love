module.exports = function (Bacon, enteringShips, destroyerPosition) {
  function shipMapper(ship) { return ship.type === 'zrrk' ? 1 : 0; }

  var threat = destroyerPosition.map(function (pos) {
    if(pos < 1) return 'extreme';
    if(pos >= 1 && pos <= 2) return 'high';
    if(pos > 2 && pos < 5) return 'medium';
    return 'low';
  });

  var entered = destroyerPosition.map(function (pos) {
    return pos < 1;
  });

  return {
    ships: enteringShips.map(shipMapper),
    threat: threat,
    postArrivalShips: enteringShips.filter(entered).map(shipMapper)
  };
};