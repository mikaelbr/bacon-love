'use strict';

var Q = require('q');
var _ = require('lodash');
var Emitter = require('events').EventEmitter;
var verify = require("../../verify.js");

var callbackHelper = Q.defer();
var promiseHelper = callbackHelper.promise;


var callback = function (a, b, callback) {
  promiseHelper.then(function () {
    callback(a + ' ' + b);
  });
};
var deferred = Q.defer();
var array = [1, 2, 3];
var eventTarget = new Emitter();

var run = {
  input: [deferred.promise, eventTarget, callback, array],

  expect: function (streams, exercise, done) {
    var fails = false;
    var maybeFinished = _.after(_.size(streams), function () {
      done(fails);
    });
    var setPassed = function (success) {
      if (!success) fails = true;
      maybeFinished();
    };
    handlePromise(streams.promise, exercise, setPassed);
    handleEventTarget(streams.eventTarget, exercise, setPassed);
    handleCallback(streams.callback, exercise, setPassed);
    handleArray(streams.array, exercise, setPassed);
  }
};


var testing = {
    'Should give different stream sources passing correct values': {
        input: run.input,
        expect: run.expect
    }
};

module.exports = verify(testing, run);


function handlePromise (fromPromise, exercise, assert) {
  var expected = 'foo';
  fromPromise.onValue(function (val) {
    assert(val === expected);
  });
  deferred.resolve(expected);
}

function handleEventTarget (fromEventTarget, exercise, assert) {
  var expected = 'foo bar';
  fromEventTarget.onValue(function (val) {
    assert(val === expected);
  });

  eventTarget.emit('data', expected);
}

function handleCallback (fromCallback, exercise, assert) {
  var expected = 'foo bar';
  fromCallback.onValue(function (val) {
    assert(val === expected);
  });

  callbackHelper.resolve();
}

function handleArray (fromArray, exercise, assert) {
  var expected = 10, expectedNumCalls = 4, calls = 0;
  fromArray.fold(0, function (a, b) {
      calls++;
      return a + b;
    })
    .onValue(function (val) {
      var success = val === expected && calls === expectedNumCalls;

      if (calls !== expectedNumCalls) {
        exercise.emit('fail', 'Your array event stream should have 4 values.');
      }

      if (val !== expected) {
        exercise.emit('fail', 'Your array items should sum up to 10.');
      }

      assert(success);
    });
}