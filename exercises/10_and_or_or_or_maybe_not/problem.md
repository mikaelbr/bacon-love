# Report if The River Nidelva is Overflowing

As we know, Properties are continuous values, and as they almost
always have a value (i.e. remembers their previous value) we can
do operations on them that looks more like normal synchronous
imperative operations; like conditional and/or and negating a
boolean value.

We can do something like `myProperty.and(anotherProperty)`, and
have the resulting property be `true` if and only if both `myProperty`
and `anotherProperty` holds a value that is `true`. The same holds
true for `myProperty.or(anotherProperty)` as well, where we create a
property that holds `true` if one of the given properties holds `true`.

The negation method `.not()`, can also be used on both EventStreams,
and Properties, as it just negates a boolean from the value set. In
essence, the `.not()` method is just a short-hand for mapping to the
inverted value:

```javascript
myObservable.map(function (val) {
  return !val;
})
```

In this exercise we will see more on how to use conditional operations
with properties.


# Problem Description

In Trondheim, Norway, there is a river called Nidelva. The average flow
in some areas of Nidelva is about 200 000 liters per second. Let's say
there is a limit of how much water a specific dam can handle and
we need a report system that notifies the workers if this limit is reached.

We are only interested in having the report-system active if it is turned
on and only one of the water gates are open, or if the system is in critical
mode (this trumps if the system is active and if more than one gate is open).

The people working as this particular dam is passionate about lunch, and
won't be bothered in the lunch time.

Remember we only want to be reported if the river flow is above a specific
threshold.

Expected output: A property with the value `true` if we should activate the
report system, or `false` if there is no worries.


## Hint and Tips:

You should create two properties firstly: if we should report and if the
river limit is exceeded. After you have these you should be able to find
if the report system should be triggered.

## Template

```js
module.exports = function (Bacon, riverFlow, inCriticalMode, isOnBreak, isSingleGate, systemActive, riverFlowLimit) {
  /**
   * Your code here
   **/
  return resultingProperty;
};
```