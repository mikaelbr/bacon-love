'use strict';

var Bacon = require('baconjs');
var verify = require("../../verify.js");

var litresInQubicFeet = 28.3168;
var run = {
  input: [Bacon.sequentially(10, [[200, 5], [50, 10], [150, 2]]), litresInQubicFeet],

  expect: function (stream, exercise, assert) {
    var calledNumberOfTimes = 0;
    var expectedCalls = 7;
    var expectedSum = 36811;

    stream
      .doAction(function (v) {
        calledNumberOfTimes++;
      })
      .fold(0, function (a, b) {
        return a + b;
      })
      .onValue(function (sum) {
        console.log(sum, calledNumberOfTimes)
        assert(sum === expectedSum && calledNumberOfTimes === expectedCalls);
      });
  }
};


var testing = {
    'Some descriptive text defining what this test does': {
        input: run.input,
        expect: run.expect
    }
};

module.exports = verify(testing, run);