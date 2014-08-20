# Create new event sources

Bla bla create sources some introduction here.

## Template

For this particular exercise you will have to return
multiple sources from your main function. See template.

```js
// include the Bacon.js library
var Bacon = require('baconjs');

var streamGenerator = function(promise, eventTarget, callback, array) {
  return {
    promise: // your promise implementation here
    eventTarget: // your eventTarget implementation here
    callback: // your callback implementation here
    array: // your array implementation here
  };
};

// expose the stream generator as a module method
module.exports = streamGenerator;
```