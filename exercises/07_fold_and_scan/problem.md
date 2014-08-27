# Fold and Scan

Scan is the lazy counterpart of fold. Where a fold wont end until the observable ends a scan will just continue to accumulate values as they are being emitted from the observable.

TODO: Expand theory

## The problem

The Earthian Defence Force has come to you for aid once again. You must use
your newfound intelligence gathering skills to provide them with a running
tally of Zrrk ships which has entered the solar system.

The EDF has also requested a specialized report on the ships immediatly
following the Zrrk Planet Destroyer to see if they might be targets of value.
The report should contain the distribution of the first five ships which enter
immediatly after the Zrrk Planet Destroyer. You will know when the Destroyer
has arrived when the position is `<1`.

The format of the report should match this:
```json
{
  "typeA": 1,
  "typeB": 2,
  "typeC": 3
  ...etc
}
```
The sensors are the same as the previous exercise.

## Template

```js
// include the Bacon.js library
var Bacon = require('baconjs');

module.exports = function (enteringShips, destroyerPosition) {

  return {
    shipTally: void 0, //The running tally of ships goes here
    threatReport: void 0, //The report of ships immediatly following the Destroyer goes here
  };
};
```
