'use strict';

var verify = require('../../verify.js');
var Bacon = require('baconjs');
var _ = require('lodash');

var sector1 = new Bacon.Bus();
var sector2 = new Bacon.Bus();
var sector3 = new Bacon.Bus();
var sector4 = new Bacon.Bus();

var report =  {
  sector1: 4,
  sector2: 2,
  sector3: 1,
  sector4: 4,
  sector5: 0
};

var message = "This is the Zrrk command! Orders are to halt all attacks.";

var run = {
  input: [sector1.toProperty(10), sector2.toProperty(10), sector3.toProperty(10), sector4.toProperty(10)],
  expect: function (streams, ex, assert) {
    streams
      .sampledBy(sector4)
      .onValue(function (v) { return assert(_.isEqual(v, report)); });

    sector1.push(4);
    sector2.push(2);
    sector3.push(1);
    sector4.push(4);
  }
};

var testing = {
  'Should the updated count for sector1': {
    input: [sector1.toProperty(10), sector2.toProperty(10), sector3.toProperty(10), sector4.toProperty(10)],
    expect: function (streams, ex, assert) {
      var count = 4;
      var unsub = streams
        .sampledBy(sector1)
        .onValue(function (report) {
          assert(report.sector1 === count);
        });
      sector1.push(count);
      unsub();
    }
  },
  'Should the updated count for sector2': {
    input: [sector1.toProperty(10), sector2.toProperty(10), sector3.toProperty(10), sector4.toProperty(10)],
    expect: function (streams, ex, assert) {
      var count = 4;
      var unsub = streams
        .sampledBy(sector2)
        .onValue(function (report) {
          assert(report.sector2 === count);
        });
      sector2.push(count);
      unsub();
    }
  },
  'Should the updated count for sector3': {
    input: [sector1.toProperty(10), sector2.toProperty(10), sector3.toProperty(10), sector4.toProperty(10)],
    expect: function (streams, ex, assert) {
      var count = 4;
      var unsub = streams
        .sampledBy(sector3)
        .onValue(function (report) {
          assert(report.sector3 === count);
        });
      sector3.push(count);
      unsub();
    }
  },
  'Should the updated count for sector4': {
    input: [sector1.toProperty(10), sector2.toProperty(10), sector3.toProperty(10), sector4.toProperty(10)],
    expect: function (streams, ex, assert) {
      var count = 4;
      var unsub = streams
        .sampledBy(sector4)
        .onValue(function (report) {
          assert(report.sector4 === count);
        });
      sector4.push(count);
      unsub();
    }
  },
  'Should the updated count for sector5': {
    input: [sector1.toProperty(10), sector2.toProperty(10), sector3.toProperty(10), sector4.toProperty(10)],
    expect: function (streams, ex, assert) {
      var unsub = streams
        .sampledBy(sector1)
        .onValue(function (report) {
          assert(report.sector5 === 0);
        });
      sector1.push(0);
      unsub();
    }
  }
};

module.exports = verify(testing, run);
