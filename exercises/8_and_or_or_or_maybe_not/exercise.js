'use strict';

var Bacon = require('baconjs');
var verify = require("../../verify.js");

// cubicFlow, inCriticalMode, isRiverFlowing, shouldBother, riverFlowLimit

var cubicFlow = new Bacon.Bus();
var inCriticalMode = Bacon.constant(false);
var isOnBreak = Bacon.constant(false);
var isRiverFlowing = Bacon.constant(true);
var shouldBother = Bacon.constant(true);
var riverFlowLimit = 2000;


var run = {
  input: [cubicFlow, inCriticalMode, isOnBreak, isRiverFlowing, shouldBother, riverFlowLimit],

  expect: function (stream, exercise, done) {
    stream.onValue(function (report) {
      done(report === true);
    });

    cubicFlow.push(4000);
  }
};


var testing = {
    'Some descriptive text defining what this test does': {
        input: run.input,
        expect: run.expect
    },
    'Some other thing here': {
      input: [cubicFlow, inCriticalMode, isOnBreak, isRiverFlowing, shouldBother, riverFlowLimit],

      expect: function (stream, exercise, done) {
        stream.onValue(function (report) {
          done(report !== true);
        });

        cubicFlow.push(1000);
      }
    }
};

module.exports = verify(testing, run);