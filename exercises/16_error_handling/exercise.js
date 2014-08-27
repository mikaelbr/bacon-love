'use strict';

var verify = require('../../verify.js');
var Bacon = require('baconjs');
var _ = require('lodash');

var asyncTask = new Bacon.Bus();

function invert(fun) {
  return function (v) {
    return fun(!v);
  };
}

var run = {
  input: [asyncTask],
  expect: function (streams, ex, assert) {
    var unsub = streams
      .sampledBy(asyncTask.errors().mapError(true))
      .onValue(assert);

    asyncTask.push(1);
    asyncTask.error('error');
    unsub();
  }
};

var testing = {
  'Should display error message when given an error': {
    input: run.input,
    expect: run.expect
  },
  'Should not display error message when given a result': {
    input: run.input,
    expect: function (streams, ex, assert) {
      var unsub = streams
        .sampledBy(asyncTask)
        .onValue(invert(assert));

      asyncTask.push(1);
      unsub();
    }
  },
  'Should not display error message when idle': {
    input: run.input,
    expect: function (streams, ex, assert) {
      var unsub = streams
        .onValue(invert(assert));
      unsub();
    }
  }
};

module.exports = verify(testing, run);
