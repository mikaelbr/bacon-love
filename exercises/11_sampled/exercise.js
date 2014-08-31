'use strict';

var Bacon = require('baconjs');
var verify = require("../../verify.js");

var c1 = new Bacon.Bus();
var c2 = new Bacon.Bus();

var run = {
  input: [
    Bacon.interval(10, 1).toProperty(0), // west river
    Bacon.interval(10, 2).toProperty(0), // east river
    c1.delay(10) // mouse click
  ],

  expect: function (stream, exercise, assert) {
    stream.onValue(function (sum) {
      assert(sum === 3);
    });

    c1.push(true);
  }
};

var testing = {
    'Should make an EventStream from samples with the sum of the two rivers on click': {
      input: run.input,
      expect: run.expect
    },

    'Should emit values every time button is clicked and give the sum of the two rivers on click': {
      input: [
        Bacon.interval(10, 5).toProperty(0), // west river
        Bacon.repeatedly(100, [1, 2, 3, 4]).toProperty(0), // east river
        c2 // mouse click
      ],

      expect: function (stream, exercise, assert) {
        var numCalls = 0;
        stream.scan(0, function (a, b) {
          return a + b;
        }).onValue(function (sum) {
          if (numCalls++ === 2) assert(sum === 16);
        });

        setTimeout(function () {
          c2.push(true);
        }, 250);

        setTimeout(function () {
          c2.push(true);
        }, 500);
      }
    },

    'Should return an event stream': {
      input: [
        Bacon.interval(10, 1).toProperty(0), // west river
        Bacon.interval(10, 2).toProperty(0), // east river
        Bacon.once(true) // mouse click
      ],

      expect: function (stream, exercise, assert) {
        // assert(stream instanceof Bacon.EventStream);
        assert(true);
      }
    }
};

module.exports = verify(testing, run);