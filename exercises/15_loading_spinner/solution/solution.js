module.exports = function (clicks, startAsyncTask) {
  var request = clicks.map(true);
  var response = request.flatMap(startAsyncTask);

  var pending = request.merge(response.map(false)).toProperty(false);

  return pending;
};
