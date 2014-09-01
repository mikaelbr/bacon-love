# Fold and Scan

When learning about functional programming, the concept of reduce usually
comes up as a part of the map-filter-reduce-trifecta. Another name for reduce
is fold, which is used in many functional programming languages.

Folding a Collection and folding an Observable is not as similar as was the
case with `map` and `filter`. Observables are potentially infinite which will
cause problems for a `fold` combinator which relies on being ended.

This is why there is also something called `scan`. Scan is the lazy counterpart
of `fold`. Where `fold` won't produce a value until it can be ended, a scan
will just continue to accumulate values as they are being emitted from the source.
From this follows that the result of a `scan` will always be a Property.

Expanding on the `map` example with the clickStream from the previous
exercise, we can illustrate how a `scan` works:

```js
var clickStream = Bacon.fromEventTarget(document.querySelector('button'), 'click');
var oneStream = clicks.map(function (c) { return 1; });
var counter = ones.scan(0, function (acc, v) { return acc + v; });

/*
  clickStream: ---c----c--c----c------c-->

               vvvv    map(c => 1)    vvvv

  oneStream:   ---1----1--1----1------1-->

               vvvv   scan(0, add)    vvvv

  counter:     ---1----2--3----4------5-->
*/
```

But what about fold? Is it even relevant when we are dealing with potentially
infinite sequences of values? The short answer is yes. As it turns out, we
have ways to end an Observable which is what we need in order to use fold. The
easiest way of ending an Observable is to use the `take(n)` combinator. It
will end the Observable after the `n` first values. There are several
variations of `take` available, one worth mentioning is `takeWhile(pred)`
which will take values as long as the predicate holds. We'll see more about
`take` and `takeWhile` in exercise 12; Selective Data By Timing.

Another way to end an Observable is to receive a special end-value, which is a
message from the source that there will never be more values.

The most important difference between `fold` and `scan` is in when they emit
values. `fold` won't emit a value until it ends, whereas `scan` will emit
values every time it gets passed a value.

## Problem Description

The Earthian Defence Force (EDF) has come to you for aid once again. You must use
your newfound intelligence gathering skills to provide them with a running
tally of Zrrk ships which has entered the solar system.

The EDF has also requested a specialized report on the ships immediately
following the Zrrk Planet Destroyer to see if they might be targets of value.
The report should contain the distribution of the first five ships which enter
immediately after the Zrrk Planet Destroyer. You will know when the Destroyer
has arrived when the position is `< 1`.

The format of the report should match this:

```json
{
  "typeA": 1,
  "typeB": 2,
  "typeC": 3
  ...etc
}
```
The sensors are the same as the previous exercise.

## Template

```js
module.exports = function (Bacon, enteringShips, destroyerPosition) {
  /**
   * Your code here
   */
  return {
    shipTally: void 0, //The running tally of ships goes here
    threatReport: void 0, //The report of ships immediately following the Destroyer goes here
  };
};
```
