var Bacon = require('baconjs');

module.exports = function (asyncTask) {
  return asyncTask.map(false).mapError(true).toProperty(false);
};