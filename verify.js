'use strict';

require('./enforce-node-version')();

require('babel-core/register')({
  presets: [require('babel-preset-es2015')],
  plugins: [require('babel-plugin-add-module-exports')]
});

var path = require('path');

var _ = require('lodash');
var Bacon = require('baconjs');
var exerciser = require('workshopper-exercise');
var filecheck = require('workshopper-exercise/filecheck');
var execute = require('workshopper-exercise/execute');

var isFirstItemBaconInstance = _.flowRight(isProbablyBaconInstance, _.sample);

module.exports = function (tests, testRun, options) {
  var exercise = _.flowRight(execute, filecheck)(exerciser());

  options = options || {};
  var before = options.before || _.noop;
  var after = options.after || _.noop;

  exercise.addProcessor(function (mode, callback) {
    var isRunMode = mode === 'run';
    var passed = true;
    var usersolution;

    try{
      usersolution = require(path.resolve(process.cwd(), this.args[0]));
    } catch (e) {
      var message = (e.code !== 'MODULE_NOT_FOUND'
                      ? 'Could not find your file. Make sure the path is correct.'
                      : 'You need to install all of the dependencies you are using in your solution (e.g. "npm install baconjs")');

      this.emit('fail', message);
      return callback(null, false);
    }

    if(typeof usersolution !== 'function'){
      this.emit('fail', 'You should always return a function using module.exports or export default.');
      return callback(null, false);
    }

    if(isRunMode) {
      return run(this, usersolution, testRun, callback);
    }

    var whenAllTestsDone = _.after(_.size(tests), function() {
      callback(null, passed);
    });

    _.forEach(tests, (function (test, testTitle) {
      run(this, usersolution, test, testTitle, function (err, success) {
        if (!success) passed = false;
        whenAllTestsDone();
      });
    }).bind(this));
  });

  return exercise;

  function run (exercise, usersolution, test, testTitle, callback) {
    var stream;

    if (typeof testTitle === 'function') {
      callback = testTitle;
      testTitle = void 0;
    }
    testTitle = testTitle || 'Simulated testrun';

    // try {
      stream = usersolution.apply(usersolution, [Bacon].concat(guaranteeArray(test.input)));
    // } catch (e) { }

    if (!isProbablyBaconInstance(stream) && !isFirstItemBaconInstance(stream)) {
      exercise.emit('fail', 'The exported function should always return an event stream or property (or a collection of them for ex2.).');
      return false;
    }

    before(test, stream, exercise);
    test.expect(stream, exercise, function (success) {
      after(test, stream, exercise);

      if (!success) {
        exercise.emit('fail', testTitle);
        return callback(null, false);
      }

      exercise.emit('pass', testTitle);
      return callback(null, true);
    });
  }
};

function isProbablyBaconInstance (obj) {
  return !!obj.onValue && !!obj.log;
}

function guaranteeArray (input) {
  return _.isArray(input) ? input : [input];
}
