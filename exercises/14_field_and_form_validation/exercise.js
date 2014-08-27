'use strict';

var verify = require('../../verify.js');
var Bacon = require('baconjs');
var _ = require('lodash');

var run = {
  input: void 0,
  expect: function (streams, ex, assert) {
    assert(true);
  }
};

var testing = {
  'Should be correct': {
    input: run.input,
    expect: run.expect
  }
};

module.exports = verify(testing, run);
