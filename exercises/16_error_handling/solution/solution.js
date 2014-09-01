module.exports = function (Bacon, asyncTask) {
  return asyncTask.map(false).mapError(true).toProperty(false);
};