'use strict';

var Bacon = require('baconjs');
var verify = require('../../verify');

var run = {
  input: void 0,

  expect: function (stream, exercise, assert) {
    var expectedValue = 10 + 11 + 12 + 13;
    var isProperty = !!stream.onValue && !stream.toProperty;

    if (!isProperty) {
      exercise.emit('fail', 'Returned value has to be a property.')
    }

    stream.fold(0, function (a,b) {
      return a + b;
    }).onValue(function (val) {
      if (val !== expectedValue) {
        exercise.emit('fail', 'The sum of all values do not give the correct result.')
      }

      assert(val === expectedValue && isProperty);
    });
  }
};


var testing = {
    'Should return a Property': {
        input: run.input,
        expect: run.expect
    }
};

module.exports = verify(testing, run);