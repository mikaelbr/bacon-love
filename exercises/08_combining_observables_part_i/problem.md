# Combining Observables, part I

If you felt that map-filter-fold was powerful, wait until you see combining!
We have already touched slightly on combining Observables in the previous
exercises by using a Property as the predicate for `filter` and `takeWhile`
methods. But there are more powerful tools available here.

One of the core parts of reactive programming is the ability to compose
reactive datatypes, much in the same way we compose functions in functional
programming. We have some basic methods for combining Observables: `merge`,
`combine`, and `zip`.

The `merge` method will merge an EventStream with another EventStream and give
an EventStream that emits values from both source EventStreams in the order
they are emitted. To illustrate:

```js
const as = Bacon.interval(100, 'a');
const bs = Bacon.interval(200, 'b').delay(50);
const abs = as.merge(bs);

/*
as:  ---a---a---a---a---a---a>
bs:  ---------b-------b------>

     vvvv      merge      vvvv

abs: ---a---a-b-a---a---a-b-a>
*/
```

The `combine` method will mix an Observable with another Observable and give a
single Property. The way `combine` works is that it runs a combination
function each time a value is emitted on one of the Observables which updates
the resulting Property. This way the resulting Property will always be the
result of the combination function on the most recent value on each of the
source Observables. This behavior is best illustrated with another example:

```js
const nums = Bacon.sequentially(100, [1,2,3,4,6]);
const ones = Bacon.interval(200, 1).delay(50);
const sum = nums.combine(ones, (a, b) => a + b);

/*
nums:  ---1---2---3---4---5---6>
ones:  ---------1-------1------>

       vvv   combine(add)    vvv

sum:   ---1---2-3-4---5-5-6---7>
*/
```

The last one of the basic combination methods is `zip`. `zip` has the
interesting property that it synchronizes the emitted values from its source
Observables and then emits a value decided by a zipping function. The caveat
with `zip` is that the frequency of emitted values is decided by the lowest
frequency of the sources. From this behavior follows that the result of a
`zip` combination is an EventStream. To illustrate with an example:

```js
const as = Bacon.interval(100, 'a');
const bs = Bacon.interval(200, 'b').delay(50);
const abs = as.zip(bs); //The default zip-function is to just emit a pair [a,b]

/*
as:  ---a---a---a---a---a---a>
bs:  ---------b-------b------>

     vvvv      zip      vvvv

abs: -------[a,b]---[a,b]---->
*/
```

## Problem Description

The Earthian Defence Force has been able to obtain a decoding-machine that can
translate commands from the Zrrk command. This machine does however require
both the scrambled message and a unique key that unscrambles it. The EDF has
learned that the Zrrk command sends these messages on two separate streams but
in a synchronized fashion.

Your job will be to combine these two streams with the decoder function and
produce a stream of invaluable intel for the EDF.

The decoder function, passed as the third argument, will take as its single
parameter a tuple on the form `[message, key]`.

## Template

```js
module.exports = (Bacon, messages, keys, decoderFunction) => {
  const streamOfDecodedMessages;

  return streamOfDecodedMessages;
};
```
