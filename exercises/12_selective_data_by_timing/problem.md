# Taking Samples From EventStreams and Stopping Streams

You can alter the timing of streams by distributing values over
different times, delaying values, or end streams based on a predicate.
We've seen some usage of `.take()` and `.takeWhile()` back in exercise
07. Fold and Scan, but we'll go more in depth of timing functions
in this exercise.

Like in many functional programming libraries or even in jQuery, you
can do throttle and debounce. Debounce will guarantee that only values
emitted after the delay period will be included, and with throttle
we can get buffered values that is emitted during the delay period.

There are different ways of doing debounce and throttle: You can
buffer up all values distributing them over time by doing
`.bufferingThrottle()`, where you can define a minimum wait time
between the values, or you can do `.debounceImmediate()` which gives
the first observable value and does not wait the initial delay (as
with normal debouncing).

You can also do a simple delay of a stream by calling the `.delay()`
method on the Observable you want to wait on. This can be handy if you
are trying to time something.

```js
var as = Bacon.interval(30, 'a');
var rs = as.delay(30);

/*
as:  a---a---a---a---a--->

     vvv   delay(3)  vvv

rs:  ---a---a---a---a---a>
*/
```


Another way of controlling what values you get from an observable,
is by ending the stream of data. You can do this by sending predicates
or setting how many values you would like to get out of a stream. By
doing `.take(5)` you assure that the observable ends after getting
`5` values. Another way of doing this would be to use a predicate and
the method `.takeWhile(predicate)`. As long as the predicate holds
true, values will be taken from the observable, the moment it returns
`false`, the Observable ends.


## Problem Description

Following the example of the river Nidelva in Trondheim, Norway,
we need to take samples of water quality. We want to take a sample
every `sampleTime` milliseconds (not before), but only as long as the system
is turned on. You can assume that you the given function
(parameter `untilSwitchTurnedOff`) holds true as long as the system
is active and the water samples should be taken. The first water sample
should be included in your resulting stream.

### Inputs:
 - `riverQuality` - **EventStream** with the water quality
 - `untilSwitchTurnedOff` - Function holding true when system is active
 - `sampleTime` - The interval to take samples

### Output
 - An EventStream of quality samples

## Template

```js
// include the Bacon.js library
var Bacon = require('baconjs');

module.exports = function (riverQuality, untilSwitchTurnedOff, sampleTime) {
  /**
   * Your code here
   **/
  return createdEventStream;
};
```