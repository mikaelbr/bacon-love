# Discrete Values Over Time

As previously mentioned in this workshop, we operate with two different kind
of observables; Properties and EventStreams. EventStreams are distinct values
and can be seen as lists of values over time, with the semantics `[(t, v)]`,
where each instance of a value have a connected time. An EventStream only have
value in the exact moment a new value is pushed at the stream, and does not have an
initial value. This is in contrast to Properties which are continuous and can
have an initial value (most of the time). More on Properties in the next exercise.

Examples of discrete values are each minute in an hour, a mouse click or key
strokes in an input field, or simply messages in a chat room.

In the Bacon.js implementation of FRP we have both the concept of EventStreams
and Properties, but in other implementations like RxJS, we only have a common
term; observables – with no distinction of discrete or continuous. From a practical
standpoint this means that in Bacon.js, when we have a property we know we always
have a value, but in an EventStream we can be between values.

There are different ways of wrapping values as a reactive EventStream, the most
important ones covered in exercise 2, but there are also many others in the
[Bacon.js documentation](https://github.com/baconjs/bacon.js#creating-streams).

One way to see how the EventStream works is to implement a manual stream where
we can push values to. We can create an empty EventStream by using `Bacon.Bus()`.

Example:
```javascript
const bus = new Bacon.Bus();
bus.push('Hello World!');
bus.end();
```

This will create an EventStream, that has one value before it ends.

**Aside:** If you were to add a listener to the bus after a value is pushed,
you wouldn't get the expected output. This is because unlike most EventStreams,
the Bus isn't lazy.

## From Properties to EventStreams

When you have a Property, you some times would want to make it an EventStream.
For instance, you can have a Property representing the text in an input (which
is continuous), and want to make it to an EventStream with the text every time
it changes (discrete).

One way of converting to an EventStream is by doing `property.sample(interval)` where
you can poll the source Property by a given interval, creating an EventStream with
the values at the given interval.

Another way is by doing `.changes()`, which creates an EventStream with values
from the changes of a Property. The `.changes()` method does not include the
initial value of the Property. Alternative method `.toEventStream()` behaves
the same way as `.changes()`, but includes the initial value.

Another powerful way of creating an EventStream from a property is to use the
`.sampledBy(EventStream)` method. We will get more into this in the advanced
section of the workshop when looking at the "Sampled" exercise.

## Problem Description

In this exercise we will have to create **one** EventStream that emits (sends) three
different async values in the following order: `Bacon`, `is`, `delicious`.

> Tip: If you are using a bus, you can use `setTimeout` with an incremented delay
to do the timing of the data.

## Template

Return created stream
```js
// Export method as a module.
module.exports = (Bacon) => {
  /**
   * Your code here
   **/
  return createdEventStream;
};
```