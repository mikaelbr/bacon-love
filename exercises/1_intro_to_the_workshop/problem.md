# How to do exercises

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

In the exercises we will use [Bacon.js](http://github.com/baconjs/bacon.js) as an implementation
for doing Functional Reactive Programming. The documentation of Bacon is pretty wast
and you will have read a lot of it during this workshop.

Let's get started by doing a simple exercise.

## Introductory theory

In short, Functional Reactive Programming (FRP) is about doing functional operations
on lists over time. We can handle events as lazy lists that hasn't ended yet
or where the next item is not yet known. This allows us to handle async programming
with ease and handle user input or output in a simpler manner than we would using
more imperative style programming.

In classic FRP, which we will be using here, we have two different concepts of data
sources; Behaviours and Events. In this workshop we call this Properties and EventStreams,
as this is what's used by the implementation [Bacon.js](http://github.com/baconjs/bacon.js).

We'll see more about properties and eventsources in the comming exercises. All you
need to know for this exercise is that an eventsource is a set of discrete occurances
that we can handle like a list. For instance, mouse clicks can be an event source.


## Problem description

Using Bacon.js you have different ways of creating event sources. You can wrap data of
different kinds to different reactive data types. One method you can use is `sequentially`,
which takes an interval and an array of values which the event stream iterates over
by the given interval.

To get familiar with this workshop format, you will have to create a file using the
template below and create and return an eventstream with values that sum up to `6`.
The event stream should only emit `3` values. The interval isn't important.

## Template

With a few exceptions the template to use for all exercises will be the following:


```javascript
// include the Bacon.js library
var Bacon = require('baconjs');

var streamGenerator = function(input1, input2 /* , ..., inputN */ ) {
  // return resulting stream
};

// expose the stream generator as a module method
module.exports = streamGenerator;
```

Inputs may vary in different exercises and sometimes the output can as well. Templates
are shown in each problem. For this exact exercise you'll have no inputs, you only
have to return an eventsource.