# Form and Field Validation

This is the beginning of the more open part of the workshop. Here we will take
a look at common scenarios in client-side programming. First one up is forms and
field validation.

One of the nice things about FRP is that the "graph" you construct by
transforming and combining Observables is side-effect free, which makes it
very easy to just plug into various configurations of sources and subscribers.

If we take this exercise as an example. In order to use the logic you build
for this hypothetical form validator in an actual form you would need to
connect the sources to the graph and bind the leafs of the graph to
subscribers. More specifically you would need to create EventStreams for all
the input-fields and bind the leafs to some DOM-elements to indicate to the
user the validity.

This is where the goal of functional programming to reduce shared mutable
state as much as possible really comes into its own right. Since we have
limited the mutation of the DOM to only the edges of the graph we can reason
about the logic separately from the DOM.

## Problem Description

You will be supplied with streams of three different input-fields, each with
their own validation function which takes a value as input and returns whether
the value is valid or not.

What you should return is three observables which indicate whether the value
observed is valid or not and an observable which indicates whether the field as
a whole is valid.

Field A and C is required. Field B is optional, but if it has a value it must
be valid.

## Hint and Tips

Since our validation needs to have a constant state representation, it makes
sense for them to be represented as a property rather than an eventStream.

Make sure that each of the field validation output observables has an initial
value attached to it.

## Template

```js
module.exports = (Bacon, fieldA, validationA, fieldB, validationB, fieldC, validationC) => {
  return {
    fieldAValid: void 0, //The validity of field A
    fieldBValid: void 0, //The validity of field B
    fieldCValid: void 0, //The validity of field C
    formValid: void 0    //The validity of the whole form
  };
};
```