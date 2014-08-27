# Form and Field Validation

This is the beginning of the more open part of the workshop. Here we will take
a look at common scenarios in clientside programming. First one up is form and
field validation.

## The Problem

You will be supplied with streams of two different input-fields, each with
their own validation function which takes a value as input and returns wether
the value is valid or not.

What you should return is three observables which indicate wether the value
observed is valid or not and an observable which indicates wether the field as
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
