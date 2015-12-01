// Export method taking in the correct arguments.
export default (Bacon, stream, action, actionOnValue) => {
    stream
        .doAction(action)
        .log('Value:')
        .onValue(actionOnValue);
    return stream;
};