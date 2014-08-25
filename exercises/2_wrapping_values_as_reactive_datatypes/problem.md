# Wrappig Values as Reactive Datatypes

As mentioned in previous exercise, you can create different reactive
datatypes using Bacon.js. This is often dependent of what type of
original data you have, and is just so you can handle the data in
a functional manner. This is the reactive part of Functional Reactive
Programming.

If you have a promise you want to wrap as a reactive datatype you have
a way to do this by using `Bacon.fromPromise(promise)`. The result will
be an event stream that has an event only when the promise is resolved
with a result. A reactive datatype created by doing `fromPromise` can
only ever have one value, unless you merge it or alter it in any way
(more on combining event streams in later exercises).

You can also wrap simple event emitters as reactive datatypes. Event
Emitters are typically DOM events like click, keydown etc, EventEmitter
from Node.js, or WebSocket/Socket events. Usually everything that allows
you to add listeners and/or trigger events. An example using events can
be a click of a button in a browser:

```javascript
Bacon.fromEventTarget(document.querySelector('button'), 'click').log();
```

This will log an event object created from the DOM everytime a button
is clicked. Don't bother about the `.log()` method just yet, there will
be more about this (socalled subscribers) in the next exercise.

See [Creating Stream](https://github.com/baconjs/bacon.js#creating-streams)
to see more ways of creating reactive datatypes from values.


## The problem

In this exercise you will have to created 4 different reactive datatypes
based on values given as input.

Inputs are given in the following order:

1. `promise` - A promise that should be wrapped to as a reactive datatype
2. `eventTarget` - an event emitter object that emits data on a `data` channel.
3. `callback` - A callback which when called should give a value on an event stream

In addition to these values, you should create an event source that emits all
the values in an array. The array should have 4 incremented values starting with `1´.
(i.e. the sum of all values should be `10`).

In this particular exercise the template used is different than in the rest of the
exercises. Instead of returning one stream you should return an object literal of
streams, with the keys as defined in the template below.

## Template

```javascript
// include the Bacon.js library
var Bacon = require('baconjs');

var streamGenerator = function (promise, eventTarget, callback) {
  return {
    promise: void 0, // return your promise implementation here
    eventTarget: void 0, // return your eventTarget implementation here
    callback: void 0, // return your callback implementation here
    array: void 0 // return your array implementation here
  };
};

// expose the stream generator as a module method
module.exports = streamGenerator;
```