# Discrete Values Over Time

As previously mentioned in this workshop, we operate with two different kind
of observables; properties and eventstreams. Eventstreams are distinct values
and can be seen as lists of values over time, with the semantics `[(t, v)]`,
where each instance of a value have a connected time. An EventStream only have
value in the moment a new value is pushed at the stream, and does not have an
initial value. This is in contrast to properties which are continuous and do
have an initial value (most of the time). More on properties in the next
exercise.

Examples of discrete values are each minute in an hour, a mouse click or key
strokes in an input field, or simply messages in a chat room.

In the Bacon.js implementation of FRP we have both the concept of eventstreams
and properties, but in other implementations like RxJS, we only have a common
term; observables – with no destinction of discrete or continuous. From a practical
standpoint this means that in Bacon.js, when we have a property we know we always
have a value, but in an eventstream we can be between values.

There are different ways of wrapping values as a reactive eventstream, the most
important ones covered in exercise 2, but there are also many others in the
[Bacon.js documentation](https://github.com/baconjs/bacon.js#creating-streams).

One way to see how the eventstream works is to implement a manual stream where
we can push values to. We can create an empty eventstream by using `Bacon.Bus()`.

Example:
```javascript
var bus = new Bacon.Bus();
bus.push('Hello World!');
bus.end();
```

This will create an eventstream, that has one value before it ends.

## From Properties to EventStreams

When you have a property, you some times would want to make it an EventStream.
For instance, you can have a property representing the text in an input (which
is continuous), and want to make it to an eventstream with the text everytime
it changes (discrete).

One way of converting to an eventstream is by doing `.sample(interval)` where
you can poll the eventstream by a given interval, creating an eventstream with
the values at the given time.

Another way is by doing `.changes()`, which creates an eventstream with values
from the changes of a property.

Another powerful way of creating an eventstream from a property is to use the
`.sampledBy(eventstream)` method. We will get more into this in the advanced
section of the workshop when looking at the "Sampled" exercise.

## Problem

In this exercise we will have to create a eventstream that emits three different
async values in the following order: `Bacon`, `is`, `delicious`.

> Tip: If you are using a bus, you can use `setTimeout` with an incremented delay
to time the data.

## Template

Return created stream
```js
// include the Bacon.js library
var Bacon = require('baconjs');

// Export method as a module.
module.exports = function () {
  /**
   * Your code here
   **/
  return createdEventStream;
};
```