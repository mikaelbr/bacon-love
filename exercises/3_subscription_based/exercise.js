'use strict';

var _ = require('lodash');
var Bacon = require('baconjs');
var verify = require('../../verify');

var originalConsole = console.log;
var numItems = 3;
var loggedStrings = [];
var stream = Bacon.sequentially(10, [1, 2, 3]);


var actionCount = 0;
var action = function () {
  actionCount++;
};

var valueCount = 0;
var onValue = function () {
  valueCount++;
};

var run = {
  input: [stream, action, onValue],

  expect: function (streams, exercise, assert) {
    streams.onEnd(function () {
      console.log = originalConsole;

      var loggedCorrect = _.every(loggedStrings, function (logLine) {
        return logLine.indexOf('Value:') === 0;
      });

      if (!loggedCorrect) {
        exercise.emit('fail', 'Expected a log statement to be called with the prefix "Value:"');
      }

      if (actionCount !== numItems) {
        exercise.emit('fail', 'Expected a action to be called');
      }

      if (valueCount !== numItems) {
        exercise.emit('fail', 'Expected a callback to be called on value ready.');
      }
      assert(actionCount === numItems && valueCount === numItems && loggedCorrect);
    });
  }
};

var options = {
  before: function () {
    console.log = function (prefix, val) {
      loggedStrings.push(prefix);
    };
  },
  after: function () {
    console.log = originalConsole;
  }
};


var testing = {
    'Some descriptive text defining what this test does': {
        input: run.input,
        expect: run.expect
    }
};

module.exports = verify(testing, run, options);