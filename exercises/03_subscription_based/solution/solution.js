// Export method taking in the correct arguments.
module.exports = function (Bacon, stream, action, actionOnValue) {
  stream.doAction(action).log('Value:').onValue(actionOnValue);
  return stream;
};