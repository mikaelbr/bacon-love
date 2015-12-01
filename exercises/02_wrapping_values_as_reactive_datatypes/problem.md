# Wrapping Values as Reactive Datatypes

As mentioned in previous exercise, you can create reactive datatypes by
wrapping various sources using Bacon.js. Which wrapper to use when is
dependent on what kind of data source you have. We need to wrap the original
data to get datatypes with the reactive properties we want, since JavaScript
is not natively reactive. The way these datatypes compose and interact is the
reactive part of Functional Reactive Programming.

Say you have some data represented as a promise and you want to wrap as a
reactive datatype. Then you could wrap it by using the constructor
`Bacon.fromPromise(promise)`. The result will be an EventStream that emits an
event when the promise is resolved and immediately ended.

You can also wrap EventTargets, or objects that adhere to the same interface,
as reactive datatypes. EventTargets are typically DOM elements that can
trigger events like click, keydown etc. The EventEmitter from Node.js or
WebSocket/Socket also conforms to the same interface. An example using events
can be a click of a button in a browser:

```javascript
Bacon.fromEvent(document.querySelector('button'), 'click').log();
```

This will log the event object emitted each time a button-element is clicked.
Don't think too much of the `.log()` method just yet, we will cover this and
more in the next exercise.

Refer to [Creating Stream](https://github.com/baconjs/bacon.js#creating-
streams) for more wrappers and examples of creating reactive datatypes from
different sources.


## Problem Description

In this exercise you will have to create four different reactive datatypes
based on sources given as input.

Inputs are given in the following order:

1. `promise` - A promise that should be wrapped to as a reactive datatype
2. `eventTarget` - an EventTarget object that emits data on a `data` channel.
3. `callback` - A function which expects to be called with `'foo', 'bar', cb`,
    whose call to `cb` should be emitted on an event stream.

**In addition** to these values, you should create an event source that emits all
the values in an array. The array should have 4 incremented values starting with `1`.
(i.e. the sum of all values should be `10`).

In this particular exercise the template used is different than in the rest of the
exercises. Instead of returning only one stream you should return an object literal of
streams, with the keys as defined in the template below.

## Template

```javascript
// expose the stream generator as a module method
export default (Bacon, promise, eventTarget, callback) => {
  return {
    promise: void 0,     // return your promise implementation here
    eventTarget: void 0, // return your eventTarget implementation here
    callback: void 0,    // return your callback implementation here
    array: void 0        // return your array implementation here
  };
};
```
