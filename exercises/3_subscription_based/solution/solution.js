var Bacon = require('baconjs');

// Export method taking in the correct arguments.
module.exports = function (stream, action, actionOnValue) {
  stream.doAction(action).log('Value:').onValue(actionOnValue);
  return stream;
};