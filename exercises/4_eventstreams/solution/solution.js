var Bacon = require('baconjs');

// Export method taking in the correct arguments.
module.exports = function () {
  var bus = new Bacon.Bus();
  setTimeout(function () {
    bus.push('Bacon');
    bus.push('is');
    bus.push('delicious');
    bus.end();
  }, 100);
  return bus;
};