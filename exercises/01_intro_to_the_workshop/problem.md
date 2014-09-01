# How to do Exercises

This workshop consists of multiple exercises that you have to solve. Each exercise
will have a problem description and some theoretical information
needed to solve the problem at hand.

To see if you have solved the problem or not, you can create a file with your solution
and try to run it against the verifier. You can also try to run your solution on a single
test set before you try to verify. Traditionally it's harder to pass on a verification than
on a single run.

See available commands by running the following command `bacon-love help`.

Try to run a solution by doing ```bacon-love run solution-file.js``` or verify it by
doing ```bacon-love verify solution-file.js```.

In the exercises we will use [Bacon.js](https://github.com/baconjs/bacon.js)
as an implementation for doing Functional Reactive Programming. Bacon is well
documented and you can find it at the github page. You will have to refer to
it at different points during this workshop.

Let's get started by doing a simple exercise.

## Introductory Theory

In short, Functional Reactive Programming (FRP) is functional programming with
first class representation for values that vary over time. We can represent
sequences of any event occurring at indeterminate points in time as a stream.
This allows us to do async programming with ease and handle user input or
output in a simpler manner than we would using more imperative style
programming.

In classic FRP, which we will be using here, we have two different
abstractions for data; Properties and EventStreams (collectively called
Observables). Properties are continuous values and EventStreams are discrete
values. There are many ways of implementing the central concepts of Functional
Reactive Programming, but in this workshop we will use
[Bacon.js](https://github.com/baconjs/bacon.js). We'll take a closer look at
Properties and EventStreams in the coming exercises.

In Bacon.js we can create Properties or EventStreams from sources through a
series of constructors. The reason we need to construct an instance of a
Bacon-type is that JavaScript is not naturally reactive (at the moment), so to
get abstractions that are reactive we must wrap the data sources. For
instance, mouse clicks can be a source for an EventStream.

## Problem Description

As mentioned, Bacon.js has different ways of creating reactive datatypes from
various sources. One method you can use is `sequentially`, which takes an
interval and an array of values which will create an EventStream that emits
one value each interval until all values have been emitted.

To gain some familiarity with this workshop format, you will create a file
using the template below. This file will create and return an EventStream with
values that sum up to `6`. The interval isn't important.

## Template

With a few exceptions the template to use for all exercises will be the following:

```javascript
var streamGenerator = function(Bacon, input1, input2 /* , ..., inputN */ ) {
  // return resulting stream
};

// expose the stream generator as a module method
module.exports = streamGenerator;
```

**First input will always be the Bacon library. Not all exercises will require the
Bacon object passed as argument, but it is still included.**

Inputs may vary in different exercises and sometimes the output can as well. Templates
are shown in each problem. For this exact exercise you'll have no inputs, you only
have to return an eventsource.