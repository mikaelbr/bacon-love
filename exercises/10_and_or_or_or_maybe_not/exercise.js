'use strict';

var Bacon = require('baconjs');
var verify = require("../../verify.js");

// cubicFlow, inCriticalMode, isSingleGate, systemActive, riverFlowLimit

var c1 = new Bacon.Bus();
var c2 = new Bacon.Bus();
var c3 = new Bacon.Bus();
var c4 = new Bacon.Bus();
var c5 = new Bacon.Bus();
var c6 = new Bacon.Bus();

var run = {
  input: [
    c1,
    Bacon.constant(false), // inCriticalMode
    Bacon.constant(false), // onBreak
    Bacon.constant(true), // isSingleGate
    Bacon.constant(true), // systemActive
    2000 // riverLimit
  ],

  expect: function (stream, exercise, assert) {
    stream.onValue(function (report) {
      assert(report === true);
    });

    c1.push(4000);
  }
};


var testing = {
    'Should give true if all criteria is met': {
        input: run.input,
        expect: run.expect
    },
    'Should not report if is not single gate and not in critical mode': {
      input: [
        c2,
        Bacon.constant(false), // inCriticalMode
        Bacon.constant(false), // onBreak
        Bacon.constant(false), // isSingleGate
        Bacon.constant(true), // systemActive
        2000 // riverLimit
      ],

      expect: function (stream, exercise, assert) {
        stream.onValue(function (report) {
          assert(report !== true);
        });

        c2.push(4000);
      }
    },
    'Should not report if the limit is lower than the flow': {
      input: [
        c3,
        Bacon.constant(false), // inCriticalMode
        Bacon.constant(false), // onBreak
        Bacon.constant(true), // isSingleGate
        Bacon.constant(true), // systemActive
        2000 // riverLimit
      ],

      expect: function (stream, exercise, assert) {
        stream.onValue(function (report) {
          assert(report !== true);
        });

        c3.push(1000);
      }
    },
    'Should not report if the workers are on a break': {
      input: [
        c4,
        Bacon.constant(false), // inCriticalMode
        Bacon.constant(true), // onBreak
        Bacon.constant(true), // isSingleGate
        Bacon.constant(true), // systemActive
        2000 // riverLimit
      ],

      expect: function (stream, exercise, assert) {
        stream.onValue(function (report) {
          assert(report !== true);
        });

        c4.push(4000);
      }
    },
    'Should not report if the system is inactive': {
      input: [
        c5,
        Bacon.constant(false), // inCriticalMode
        Bacon.constant(false), // onBreak
        Bacon.constant(true), // isSingleGate
        Bacon.constant(false), // systemActive
        2000 // riverLimit
      ],

      expect: function (stream, exercise, assert) {
        stream.onValue(function (report) {
          assert(report !== true);
        });

        c5.push(4000);
      }
    },
    'Should report if in critical mode (even if not active or it is not a single gate)': {
      input: [
        c6,
        Bacon.constant(true), // inCriticalMode
        Bacon.constant(false), // onBreak
        Bacon.constant(false), // isSingleGate
        Bacon.constant(false), // systemActive
        2000 // riverLimit
      ],

      expect: function (stream, exercise, assert) {
        stream.onValue(function (report) {
          assert(report === true);
        });

        c6.push(4000);
      }
    }
};

module.exports = verify(testing, run);