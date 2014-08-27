var Bacon = require('baconjs');

//TODO: Unfinished
module.exports = function (clicks, startAsyncTask) {
  var hasClicked = clicks.skip(1).map(Boolean).toProperty(false);

  var taskResult = clicks.filter(hasClicked.not()).flatMap(function () {
    return startAsyncTask();
  });

  var hasReturned = taskResult.map(Boolean).toProperty(false);

  return hasClicked.and(hasReturned.not());
};