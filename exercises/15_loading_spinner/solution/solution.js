module.exports = (Bacon, clicks, startAsyncTask) => {
    const request = clicks.map(true);
    const response = request.flatMap(startAsyncTask);

    return request.awaiting(response);
};