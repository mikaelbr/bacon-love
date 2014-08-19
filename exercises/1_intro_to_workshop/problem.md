# How to do exercises

Each exercise will have different solutions to solve.
Create a file with your solution and try to run it
against the verifier.


## Problem description

Create a file that returns an event stream emitting values
that sum up to `6`. See the Bacon.js API for how to
create new event sources.


## Template

All of your solutions must follow this template:

```js
// include the Bacon.js library
var Bacon = require('baconjs');

var streamGenerator = function(input1, input2, ...) {
    // return resulting stream
};

// expose the stream generator as a module method
module.exports = streamGenerator;
```

Inputs may vary in different exercises