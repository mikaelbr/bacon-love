// Export method taking in the correct arguments.
module.exports = (Bacon, stream, action, actionOnValue) => {
    stream
        .doAction(action)
        .log('Value:')
        .onValue(actionOnValue);
    return stream;
};