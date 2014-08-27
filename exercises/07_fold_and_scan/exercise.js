'use strict';

var verify = require('../../verify.js');
var Bacon = require('baconjs');
var _ = require('lodash');

var zrrkShip = {type: "zrrk"};
var purpleShip = {type: "purple"};
var earthianShip = {type: "earthian"};
var martianShip = {type: "martian"};

var threatReport = {
  'zrrk': 3,
  'purple': 2
};

var shipSensor = new Bacon.Bus();
var destroyerDistanceStream = new Bacon.Bus();
var destroyerDistance;

var run = {
  input: [shipSensor, destroyerDistanceStream.toProperty(8)],
  expect: function (streams, ex, assert) {
    var ships = 0;
    streams.shipTally
      .onValue(function (v) {
        ships = v;
      });

    streams.threatReport
      .onValue(function (v) { return assert(_.isEqual(v, threatReport) && ships === 4); });

    shipSensor.push(zrrkShip);
    shipSensor.push(earthianShip);
    destroyerDistanceStream.push(0.5);
    shipSensor.push(purpleShip);
    shipSensor.push(zrrkShip);
    shipSensor.push(zrrkShip);
    shipSensor.push(purpleShip);
    shipSensor.push(zrrkShip);
    shipSensor.push(martianShip);
  }
};

var testing = {
  'Should keep a running tally of Zrrk ships': {
    input: [shipSensor, destroyerDistanceStream.toProperty(8)],
    expect: function (streams, ex, assert) {
      var ships = 0;
      streams.shipTally
        .onValue(function (v) {
          ships = v;
        });

      shipSensor.push(zrrkShip);
      shipSensor.push(earthianShip);
      shipSensor.push(zrrkShip);
      assert(ships === 2);
    }
  },
  'Should give a report of the ships following the destroyer': {
    input: [shipSensor, destroyerDistanceStream.toProperty(8)],
    expect: function (streams, ex, assert) {
      streams.threatReport
        .onValue(function (v) { return assert(_.isEqual(v, threatReport)); });

      shipSensor.push(zrrkShip);
      shipSensor.push(earthianShip);
      destroyerDistanceStream.push(0.5);
      shipSensor.push(purpleShip);
      shipSensor.push(zrrkShip);
      shipSensor.push(zrrkShip);
      shipSensor.push(purpleShip);
      shipSensor.push(zrrkShip);
      shipSensor.push(martianShip);
    }
  }
};

module.exports = verify(testing, run);
