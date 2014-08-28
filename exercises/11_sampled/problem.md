# Take River Flow Samples

If you remember back in exercise 4 (EventStreams), we covered the different ways
of converting from a Property to an EventStream; One way was to sample the data.
This means that we can, by giving a sample interval **or a sample trigger**, create
a new EventStream with values from the original Property when the data is sampled.

The simplest way of doing this is by defining an interval:

```js
// new EventStream with the values from the Property every 10 ms
myProperty.sample(10)
```

But we can also have more control of when our samples occur. By using the
`.sampledBy(observable)` method. For instance, in a Browser UI we can sample
a user input by the click of a button:

```js
var button = document.querySelector('button');
var input = document.querySelector('input');

// Create a property of a text box
var text = Bacon.fromEventTarget(input, 'keyup')
                .map('.currentTarget.value')
                .toProperty();

// Create an EventStream of true when a button is clicked
var click = Bacon.fromEventTarget(button, 'click').map(true);

// An EventStream with the text of an inputbox when a button is clicked.
var textOnClick = text.sampledBy(click);
```

By default the `.sampledBy()` method will create a new EventStream with the
values of the Observable that is being sampled. This means, when doing
`original.sampledBy(trigger)` the resulting EventStream will be values
from `original` at the time of a new values on `trigger`. There are, however,
ways of changing what values that should be used. We can pass a function
as the last argument for `original.sampledBy(trigger, transformer)`, to act as
a transformer function and use both the value from the `original` and the
`trigger`. You could for instance return a bool whether or not the original
value is bigger than the trigger value.


## Problem Description

The same river as mentioned in the previous exercise, Nidelva, has a confluence
with another river called Leirelva. This confluence is a potential problem for
river overflow, so we need to build a system for taking samples of the water level
(of the two rivers combined).

To accomplish this we will need to have a button, and when that button is clicked,
a sample of the water level should be taken.

### For this exercise you will get the following input:
 - `nidelva` - property of the water levels for Nidelva
 - `leirelva` - property of the water levels for Leirelva
 - `buttonClicked` - an EventStream of button clicks

### Expected output:

An EventStream of the water level samples.

## Template

```js
// include the Bacon.js library
var Bacon = require('baconjs');

module.exports = function (nidelva, leirelva, buttonClicked) {
  /**
   * Your code here
   **/
  return resultingProperty;
};
```