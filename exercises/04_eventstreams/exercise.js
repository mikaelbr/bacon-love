'use strict';

var Bacon = require('baconjs');
var verify = require('../../verify');

var run = {
  input: [],

  expect: function (stream, exercise, assert) {
    var isEventStream = !!stream.onValue && !!stream.toProperty;
    var expectedString = 'Baconisdelicious';

    if (!isEventStream) {
      exercise.emit('fail', 'Returned value has to be an EventStream.')
    }

    stream.fold('', '.concat').onValue(function (str) {
      if (str !== expectedString) {
        exercise.emit('fail', 'You need to admit that Baconisdelicious.')
      }

      assert(str === expectedString && isEventStream);
    });
  }
};


var testing = {
    'Should return a created EventSream': {
        input: run.input,
        expect: run.expect
    }
};

module.exports = verify(testing, run);