'use strict';

var Bacon = require('baconjs');
var verify = require("../../verify.js");


var doTake = true;

var flow = Bacon.sequentially(50, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
var switchUntilTurnedOff = function () {
  return doTake;
};
var delay = 100;


var run = {
  input: [flow, sampleSwitch, delay],

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
    'Some descriptive text defining what this test does': {
        input: run.input,
        expect: run.expect
    }
};

module.exports = verify(testing, run);