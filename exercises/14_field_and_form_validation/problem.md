# Form and Field Validation

This is the beginning of the more open part of the workshop. Here we will take
a look at common scenarios in client-side programming. First one up is forms and
field validation.

One of the nice things about FRP is that the "network" you construct by
transforming and combining Observables is side-effect free, which makes it
very easy to just plug into various configurations of sources and subscribers.

If we take this exercise as an example. In order to use the logic you build
for this hypothetical form validator in an actual form you would need to
connect the sources to the network and bind the leafs of the network to
subscribers. More specifically you would need to create EventStreams for all
the input-fields and bind the leafs to some DOM-elements to indicate to the
user the validity.

This is where the goal of functional programming to reduce shared mutable
state as much as possible really comes into its own right. Since we have
limited the mutation of the DOM to only the edges of the network we can reason
about the logic separately from the DOM.

## Problem Description

You will be supplied with streams of two different input-fields, each with
their own validation function which takes a value as input and returns whether
the value is valid or not.

What you should return is three observables which indicate whether the value
observed is valid or not and an observable which indicates whether the field as
a whole is valid.

Field A and C is required. Field B is optional, but if it has a value it must
be valid.

## Template

```js
// include the Bacon.js library
var Bacon = require('baconjs');

module.exports = function (fieldA, validationA, fieldB, validationB, fieldC, validationC) {

  return {
    fieldAValid: void 0, //The validity of field A
    fieldBValid: void 0, //The validity of field B
    fieldCValid: void 0, //The validity of field C
    formValid: void 0 //The validity of the whole form
  };
};
```