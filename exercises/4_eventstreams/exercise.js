'use strict';

var Bacon = require('baconjs');
var verify = require('../../verify');

var run = {
  input: [],

  expect: function (streams, exercise, assert) {
    var isEventStream = streams instanceof Bacon.EventStream;
    var expectedString = 'Baconisdelicious';

    if (!isEventStream) {
      exercise.emit('fail', 'Returned value has to be an EventStream.')
    }

    streams.fold('', '.concat').onValue(function (str) {
      assert(str === expectedString && isEventStream);
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