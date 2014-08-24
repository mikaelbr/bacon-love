var Bacon = require('baconjs');

module.exports = function (riverWest, riverEast, buttonClicked) {
  var westWhenButtonClicked = riverWest.sampledBy(buttonClicked);

  return riverEast.sampledBy(westWhenButtonClicked, function (east, west) {
    return east + west;
  });
};