// Export method taking in the correct arguments.
module.exports = function (Bacon) {
  return Bacon.sequentially(10, [11, 12, 13]).toProperty(10);
};