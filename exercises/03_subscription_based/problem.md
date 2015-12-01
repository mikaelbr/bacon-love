# Adding Subscribers to Observables

Since all values are over time, we have no idea when they are available, and
we can't treat values synchronously. We need to provide a callback that can be
called once values are ready. This can be done with a subscriber. There are
different subscribers in the implementation of Bacon.js, but in theory, this
is just a function that is called once you have data in your observables
(EventStreams and Properties, remember?).

One well-used subscriber in Bacon.js is the `onValue` method. This adds a
subscriber the observable and **returns a function to unsubscribe**.
This is important to remember; It means that we **cannot** continue our chain
pipeline after a subscriber.

All reactive datatypes created using Bacon.js is in principle lazy. This means,
if you have no subscriber at the end of your pipeline, the data flow won't happen.

There is a special subscriber that behaves a bit different then the classic
`onValue`. The `.log()` subscriber will initiate data flow, but it will not
return an unsubscribe function, but rather return the observable it self. `log`
is a method for logging the all values in an observable to the console.

There are ways of adding actions on values in a stream, without adding a subscriber.
`doAction` returns a eventstream where the function passed is executed for each value.
The same functionality is called `tap` in libraries like lodash and underscore.

## Problem Description

First, you'll need to add an action on every event on an event stream. The
action is given as input. **Note:** This action should not terminate the stream and
you should be able to chain methods on the pipeline.

After you add an action to the pipe line, you should log the value of the event
stream out to the console **with the prefix** `Value:`.

Lastly you should add a subscriber with a callback given as the third input
(called `actionOnValue`). As we now know, the subscribers terminate the chaining
and initiate the lazy data, so we can't return the result from the subscriber,
but the original stream.

## Template

```js
// expose the stream generator as a module method
export default (Bacon, stream, action, actionOnValue) => {
  /**
   * Your code
   */
  return originalStream;
};
```