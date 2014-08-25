'use strict';

var Bacon = require('baconjs');
var verify = require('../../verify');

var run = {
  input: [[11, 11, 12, 13]],

  expect: function (streams, exercise, assert) {
    var expectedValue = 10 + 11 + 12 + 13;
    var isProperty = streams instanceof Bacon.Property;

    if (!isProperty) {
      exercise.emit('fail', 'Returned value has to be a property.')
    }

    streams.skipDuplicates().fold(0, function (a,b) {
      return a + b;
    }).onValue(function (val) {
      assert(val === expectedValue && isProperty);
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