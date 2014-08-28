# Generate Linear Stream of River Data

If you have several sources with similar data or want to create
a new stream based on values in a stream, you can do that. `flatMap`
is a combinator that allows you to take a function and spawn a new
EventStream based on an Observable. So `observable.flatMap(fn)`, can
generate a new EventStream with the values from a EventStream created
in the function `fn`. This is extremely powerful, but can be hard to
grasp at first.

One simple way to think of it is to think of the name: "flatmap";
flatten one or more EventStreams while mapping them (transforming
values). Let's see how the flattening works by example:

```js
var stream = Bacon.sequentially(10, [10, 50, 100]).flatMap(function (delay) {
  return Bacon.sequentially(10, [delay, delay, delay]).delay(delay);
});

/*
stream:  10-10-10--50--50--50---100---100---100--->
*/
```

With some delay trickery we can clearly see that the EventStreams
inside the function passed to `flatMap`, is flattened and all it's
values becomes a part of a new EventStream.

Another way of using `flatMap` is to transform and select data in
one simple step (map and filter):

```js
observable.flatMap(function (user) {
  if (user.deleted) return Bacon.never();
  return {
    name: user.firstName + ' ' + user.lastName
  };
});
```

This will create a new stream of all users that are not deleted. Note
that `Bacon.never()` is simply an EventStream that immediately ends,
and in this setting it will cause an empty value (a non-emitted one).

---

You can also use a special case of flatmaps to create a new stream
from another stream. This works in the exact same way as `flatMap`, but
instead of taking all the EventStreams generated inside the body of
the passed function, it only takes the last created (or first):
`flatMapLatest` or `flatMapFirst`. If we were to swap out `flatMap`
with `flatMapLatest` in the first example above, we would get the
output `100---100---100`, and `flatMapFirst` would give
`10-10-10`. We've essentially swapped the original observable with a
new EventStream created by an emitted value. This can be used in many
different creative ways, as long as one can wrap ones head around it.

To see some of the things we can do, lets try to create a new EventStream,
showing "Bacon" every X milliseconds, where X milliseconds are changed
every X milliseconds. It sounds really contrived, but it will show how
we can use a stream to transform it to another stream in simple code.

```js
// Change ms source every second
// Alternate between 1000 ms, 1500 ms and 500 ms:
var ms = Bacon.repeatedly(1000, [1000, 1500, 500]);

// Create a new EventStream using Bacon.interval
ms.flatMapLatest(Bacon.interval).map('Bacon!').log();
```

This example will alternate every second on displaying "Bacon!" in
different intervals. Pretty useful stuff.


## Exercise Description

Still continuing our example of the river Nidelva. Some data specialists
have been taking water level samples from a specific point on the river,
but the data format is hard to work with, and we need to transform the data
to a linear stream of water levels. This is the format the data specialists
stored the data as:

```
[
  [<WATER_LEVEL_PER_SECOND>, <NUMBER_OF_SAMPLES>],
  [<WATER_LEVEL_PER_SECOND>, <NUMBER_OF_SAMPLES>],
  // ...
]
```

In addition to this, the data specialists didn't use proper metric units,
and stored all the data as cubic feet instead of liters (you get passed
the factor for transforming cubic feet to liters as an argument).

We need to take the data specialist stream of tuples and transform it
to a linear stream (with duplicate values where the number of samples is `> 1`).

**Note**: We are only interested in the data points where the water level
is below the average water level in Nidelva (`200 000` liters).



**Tip**: The timing factor is irrelevant in this exercise.


### Inputs
 - `riverFlowInCubicFeet` Stream of tuples from the data specialists
 - `litresInCubicFeet` Factor which to multiply cubic feet with to get liters


### Output
 - EventStream with liters from Nidelva. E.g. [190000, 180000, etc]


## Template

```js
// include the Bacon.js library
var Bacon = require('baconjs');

module.exports = function (riverFlowInCubicFeet, litresInCubicFeet) {
  /**
   * Your code here
   **/
  return resultingEventStream;
};
```
