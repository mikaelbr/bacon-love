export default (Bacon, asyncTask) =>
    asyncTask
        .map(false)
        .mapError(true)
        .toProperty(false);