'use strict';

var Bacon = require('baconjs');
var verify = require("../../verify.js");


var west = Bacon.interval(10, 1).toProperty(0);
var east = Bacon.interval(10, 2).toProperty(0);
var click = new Bacon.Bus();

var run = {
  input: [west, east, click.delay(10)],

  expect: function (stream, exercise, done) {
    stream.onValue(function (sum) {
      console.log("Sum:", sum);
      done(sum === 3);
    });

    click.push(true);
  }
};


var testing = {
    'Some descriptive text defining what this test does': {
        input: run.input,
        expect: run.expect
    }
};

module.exports = verify(testing, run);