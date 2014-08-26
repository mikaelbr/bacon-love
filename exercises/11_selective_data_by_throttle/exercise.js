'use strict';

var Bacon = require('baconjs');
var verify = require("../../verify.js");

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var doTake = true;

var run = {
  input: [
    Bacon.sequentially(50, arr),
    function () {
      return doTake;
    },
    100
  ],

  expect: function (stream, exercise, assert) {
    var calledNumberOfTimes = 0;

    stream
      .doAction(function (v) {
        calledNumberOfTimes++;
      })
      .fold(0, function (a, b) {
        return a + b;
      })
      .onValue(function (sum) {
        assert(sum === 9 && calledNumberOfTimes === 3);
      });

    setTimeout(function () {
      doTake = false;
    }, 300);
  }
};


var testing = {
    'Should only take until switch is turned off.': {
        input: run.input,
        expect: run.expect
    },
    'Should take all values if always take and sampleTime less than interval': {
      input: [
        Bacon.sequentially(30, arr),
        function () {
          return true;
        },
        10
      ],

      expect: function (stream, exercise, assert) {
        var calledNumberOfTimes = 0;
        var expectedTotal = arr.reduce(function (a,b) {
          return a + b;
        }, 0);

        stream
          .doAction(function (v) {
            calledNumberOfTimes++;
          })
          .fold(0, function (a, b) {
            return a + b;
          })
          .onValue(function (sum) {
            assert(sum === expectedTotal && calledNumberOfTimes === arr.length);
          });
      }
    },
    'Should not take any values if take is false': {
      input: [
        Bacon.sequentially(30, arr),
        function () {
          return false;
        },
        10
      ],

      expect: function (stream, exercise, assert) {
        var calledNumberOfTimes = 0;

        stream
          .doAction(function (v) {
            calledNumberOfTimes++;
          })
          .fold(0, function (a, b) {
            return a + b;
          })
          .onValue(function (sum) {
            assert(sum === 0 && calledNumberOfTimes === 0);
          });
      }
    },
};

module.exports = verify(testing, run);