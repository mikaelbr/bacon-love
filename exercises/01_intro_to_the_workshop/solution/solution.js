module.exports = function (Bacon) {
  return Bacon.sequentially(100, [1, 2, 3]);
};