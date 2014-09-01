// Export method taking in the correct arguments.
module.exports = function (Bacon, promise, eventTarget, callback) {
  return {
    // When the promise is resolved a value is sent through the event stream
    // created from Bacon.fromPromise
    promise: Bacon.fromPromise(promise),

    // Listen for events on eventTarget in the 'data' channel.
    // When value is emitted, the created event source will
    // have a value.
    eventTarget: Bacon.fromEventTarget(eventTarget, 'data'),

    // Creates an event stream when a callback is called.
    // Pass in default arguments 'foo' and 'bar' to the callback.
    callback: Bacon.fromCallback(callback, 'foo', 'bar'),

    // Use the Bacon.fromArray method to give an event stream
    // with 4 values and giving a sum of 10.
    array: Bacon.fromArray([1, 2, 3, 4])
  };
};