'use strict';

var verify = require('../../verify.js');
var Bacon = require('baconjs');
var _ = require('lodash');

var zrrkShip = {type: "zrrk"};
var purpleShip = {type: "purple"};
var earthianShip = {type: "earthian"};
var martianShip = {type: "martian"};

var threats = ['low', 'low', 'medium', 'high', 'extreme', 'extreme'];

var shipSensor1 = new Bacon.Bus();
var shipSensor2 = new Bacon.Bus();
var shipSensor3 = new Bacon.Bus();
var destroyerDistanceStream1 = new Bacon.Bus();
var destroyerDistanceStream2 = new Bacon.Bus();
var destroyerDistance;

var shipSensorR = new Bacon.Bus();
var destroyerDistanceStreamR = new Bacon.Bus();

var run = {
  input: [shipSensorR, destroyerDistanceStreamR.toProperty(8)],
  expect: function (streams, ex, assert) {
    var a = streams.ships
      .fold(0, function (acc, v) { return acc + v; });

    var b = streams.threat.changes()
      .fold([], '.concat');

    var c = streams.postArrivalShips
      .fold(0, function (acc, v) { return acc + v; });

    var all = Bacon.zipAsArray(a,b,c)
      .onValues(function (ships, threat, postArrivalShips) {
        return assert(ships === 3 && _.isEqual(threat, threats) && postArrivalShips == 2);
      });

    shipSensorR.push(zrrkShip);
    destroyerDistanceStreamR.push(8);
    destroyerDistanceStreamR.push(7);
    destroyerDistanceStreamR.push(4);
    destroyerDistanceStreamR.push(2);
    destroyerDistanceStreamR.push(0.5);
    destroyerDistanceStreamR.push(0);
    shipSensorR.push(earthianShip);
    shipSensorR.push(zrrkShip);
    shipSensorR.push(zrrkShip);
    destroyerDistanceStreamR.end();
    shipSensorR.end();

  }
};

var testing = {
  'Should emit 1s for Zrrk ships': {
    input: [shipSensor1, destroyerDistanceStream1.toProperty(8)],
    expect: function (streams, ex, assert) {
      streams.ships
        .fold(0, function (acc, v) { return acc + v; })
        .onValue(function (v) { return assert(v === 3); });

      shipSensor1.push(zrrkShip);
      shipSensor1.push(zrrkShip);
      shipSensor1.push(zrrkShip);
      shipSensor1.end();
    }
  },
  'Should emit 0s for non-Zrrk ships': {
    input: [shipSensor2, destroyerDistanceStream1.toProperty(8)],
    expect: function (streams, ex, assert) {
      streams.ships
        .fold(0, function (acc, v) { return acc + v; })
        .onValue(function (v) { return assert(v === 0); });

      shipSensor2.push(earthianShip);
      shipSensor2.push(purpleShip);
      shipSensor2.push(martianShip);
      shipSensor2.end();
    }
  },
  'Should give approperiate threat levels': {
    input: [shipSensor3, destroyerDistanceStream1.toProperty(8)],
    expect: function (streams, ex, assert) {
      streams.threat.changes()
        .fold([], '.concat')
        .onValue(function (v) { return assert(_.isEqual(v, threats)); });

      destroyerDistanceStream1.push(8);
      destroyerDistanceStream1.push(7);
      destroyerDistanceStream1.push(4);
      destroyerDistanceStream1.push(2);
      destroyerDistanceStream1.push(0.5);
      destroyerDistanceStream1.push(0);
      destroyerDistanceStream1.end();
    }
  },
  'Should emit the approperiate number of Zrrk ships passing after Destroyer has arrived': {
    input: [shipSensor3, destroyerDistanceStream2.toProperty(8)],
    expect: function (streams, ex, assert) {
      streams.postArrivalShips
        .fold(0, function (acc, v) { return acc + v; })
        .onValue(function (v) { return assert(v === 2); });

      shipSensor3.push(zrrkShip);
      destroyerDistanceStream2.push(0.5);
      shipSensor3.push(earthianShip);
      shipSensor3.push(zrrkShip);
      shipSensor3.push(zrrkShip);
      destroyerDistanceStream2.end();
      shipSensor3.end();
    }
  }
};

module.exports = verify(testing, run);
