module.exports = (Bacon, asyncTask) =>
    asyncTask
        .map(false)
        .mapError(true)
        .toProperty(false);