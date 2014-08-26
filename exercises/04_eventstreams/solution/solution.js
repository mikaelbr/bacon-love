var Bacon = require('baconjs');

// Export method taking in the correct arguments.
module.exports = function () {
  var bus = new Bacon.Bus();
  setTimeout(function () {
    bus.push('Bacon');
  }, 100);

  setTimeout(function () {
    bus.push('is');
  }, 200);

  setTimeout(function () {
    bus.push('delicious');
    bus.end();
  }, 300);
  return bus;
};