var Bacon = require('baconjs');

module.exports = function () {
  return Bacon.sequentially(100, [1, 2, 3]);
};