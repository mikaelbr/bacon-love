module.exports = function (clicks, startAsyncTask) {
  var request = clicks.map(true);
  var response = request.flatMap(startAsyncTask);

  return request.awaiting(response);
};
