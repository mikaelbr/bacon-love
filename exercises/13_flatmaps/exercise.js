'use strict';

var Bacon = require('baconjs');
var verify = require("../../verify.js");

var litresInCubicFeet = 28.3168;

var run = {

  input: [
    Bacon.sequentially(10, [[8000, 5], [6000, 10], [7100, 2]]),
    litresInCubicFeet
  ],

  expect: function (stream, exercise, assert) {
    var calledNumberOfTimes = 0;
    var expectedCalls = 7;
    var expectedSum = 1534768;

    stream
      .doAction(function (v) {
        calledNumberOfTimes++;
      })
      .fold(0, sum)
      .onValue(function (sum) {
        if (sum !== expectedSum) {
          exercise.emit('fail', 'Expected sum of simulated run to be ' + expectedSum + ' but was ' + sum);
        }
        assert(sum === expectedSum && calledNumberOfTimes === expectedCalls);
      });
  }
};

var testing = {
  'Should send data that is over the limit (200 000).': {
    input: run.input,
    expect: run.expect
  },
  'Should not give any data points if no samples are over the limit (200 000)': {

    input: [
    Bacon.sequentially(10, [[6000, 5], [6000, 10], [4000, 2]]),
      litresInCubicFeet
    ],

    expect: function (stream, exercise, assert) {
      var calledNumberOfTimes = 0;
      var expectedCalls = 0;
      var expectedSum = 0;

      stream
        .doAction(function (v) {
          calledNumberOfTimes++;
        })
        .fold(0, sum)
        .onValue(function (sum) {
          assert(sum === expectedSum && calledNumberOfTimes === expectedCalls);
        });
    }
  },
  'Should have rounded values': {

    input: [
    Bacon.sequentially(10, [[8000, 5], [6000, 10], [7100, 2]]),
      litresInCubicFeet
    ],

    expect: function (stream, exercise, assert) {
      stream.fold(0, sum)
        .onValue(function (sum) {
          assert(sum - Math.round(sum) === 0 && sum !== 0)
        });
    }
  }
};

module.exports = verify(testing, run);

var sum = function (a, b) {
  return a + b;
};