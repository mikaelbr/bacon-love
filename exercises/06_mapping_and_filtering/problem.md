# Mapping and filtering over Observables

TODO: Theory

## The problem

The year is 3001 and the planet Earth is under attack by the Zrrks of planet
Omicron Persei 7. In order to help the Earthian Defence Force you have been
tasked with the gathering of intelligence on the incoming Zrrk invasion. The
EDF has provided you with two key sensors which gives constant readings on
critical metrics of the invading Zrrk force:

- A sensor which registers all ships that enter our solar system.
- A sensor which at any time registers the position of the Zrrk Planet
Destroyer in lightyears.

Your assignment is to provide three key strategical pieces of information:

- A stream which emits a 1 for Zrrk ships and a 0 for all other ships which
passes the sensor.
- A property which reads the current threat level based on the distance of the
Zrrk Planet Destroyer.
  - Low threat for `x>5`.
  - Medium threat for `5=>x>2`.
  - High threat for `2=>x>=1`.
  - Extreme threat for `x<1`.
- A stream which emits a 1 for Zrrk ships and a 0 for all other ships which
passes the sensor, but only after we have achieved extreme threat.

Ships entering the solar system will have this information:
```json
{
  "type": "zrrk|earthian|purple|martian"
}
```

## Template


```js
// include the Bacon.js library
var Bacon = require('baconjs');

module.exports = function (enteringShips, destroyerPosition) {
  return {
    ships: void 0, // Your ship counter goes here
    threat: void 0, // Your threat level goes here
    postArrivalShips: void 0 // Your ship counter post arrival goes here
  };
};
```
