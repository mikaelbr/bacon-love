# Combining Observables, part II

In the previous exercise we looked primarily on combining pairs of
Observables. Sometimes however, we want to combine more than two Observables.
The semantics of the multi-Observable combinators are the same as their
pairwise counterparts discussed in the previous exercise.

As an illustration:

```js
var ones = Bacon.interval(100, 1);
var twos = Bacon.interval(100, 2);
var threes = Bacon.interval(100, 3);

var result = Bacon.zipAsArray(ones, twos, threes);

/*
ones:    ---1---1---1---1---1--->
twos:    ---2---2---2---2---2--->
threes:  ---3---3---3---3---3--->

         vvv   zipAsArray()   vvv

           [1, [1, [1, [1, [1,
            2,  2,  2,  2,  2,
result:  ---3]--3]--3]--3]--3]-->
*/
```

One particular interesting multi-Observable combinator is a special case of
the `combine` method, namely the `Bacon.combineTemplate` function. This
function is particularly useful when combining multiple Observables into a
single Property that represent some meaningful grouping of the Observables,
for instance a Model-object (from MVC). `Bacon.combineTemplate` takes a
template-object as an argument, which binds Observables to labels in the
object.

There are many more multi-Observable combinators in the Bacon.js docs
[here](https://github.com/baconjs/bacon.js/#combining-multiple-streams-and-properties).

## Problem Description

Thanks to the intel you have provided throughout the defence campaign against
the Zrrk invasion, the Earthian Defence Force has concluded that the Zrrk come
in peace. The EDF have decided that in order to show signs of good will
towards the apparently friendly Zrrk to broadcast the withdrawal status of the
EDF fleet.

The solar system is divided into five sectors, with EDF ships being deployed
in sector one through four. Your final assignment will be to provide a report
for the Zrrk commander on the current status of deployed EDF ships in all five
sectors of the solar system.

## Template

```js
// include the Bacon.js library
var Bacon = require('baconjs');

module.exports = function (sector1Count, sector2Count, sector3Count, sector4Count) {
  var deploymentReport;

  return deploymentReport;
};
```
