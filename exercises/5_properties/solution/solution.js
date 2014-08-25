var Bacon = require('baconjs');

// Export method taking in the correct arguments.
module.exports = function (arraySource) {
  return Bacon.sequentially(10, arraySource).toProperty(10);
};