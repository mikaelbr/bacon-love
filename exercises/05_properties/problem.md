# Continuous Values

In many ways Properties are very much alike EventStreams as we covered in the
previous exercise. If you haven't read the last exercise you should do this now.

The main difference between Properties and EventSources is that Properties
can have an initial value and it will always have a value and thus are
continuous. The semantics of a Property is `f(t) -> v`. Where given a time `t`,
it has a connected value `v`.

Examples of a Property can be the time (in contrast to just the minutes of
an hour), mouse movement on a screen, or the text in a input field or the
chatlog of a chat room. Continuous can be observed but not counted.

You can create properties by converting EventStreams by using either the
`.toProperty()` method or by doing something called `scan` or `fold`. `scan`
and `fold` is very similar to traditional `reduce` in functional programming.
If you are not familiar with `reduce` we will discuss it in a later exercise.

By using `.toProperty(initial)` we can convert an EventStream to a Property
with the initial value defined as the first argument. To create a Property
from a input box you could do the following:

Example:
```javascript
var property = Bacon.fromEventTarget(document.querySelector('input'), 'keyup')
      .map('.currentTarget.value')
      .toProperty('Default string');
```

**Note:** Don't worry about the `map` method right now. We will see how this
works in the next exercise. All you need to know for now is that i transforms
the EventStream from being a set of event objects to a stream of values.

## Exercise Problem

In this exercise we have to create a Property that has an initial value of
`10` and increments three times, ending as `13`. So a property following this
number sequence: `10 -> 11 -> 12 -> 13`.

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
  return createdProperty;
};
```