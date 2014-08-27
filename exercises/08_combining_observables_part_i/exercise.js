'use strict';

var verify = require('../../verify.js');
var Bacon = require('baconjs');
var _ = require('lodash');

var messages = new Bacon.Bus();
var keys = new Bacon.Bus();

var decoderFunction = function (kvpair) {
  return kvpair.join('');
};

var message = "This is the Zrrk command! Orders are to halt all attacks.";

var run = {
  input: [messages, keys, decoderFunction],
  expect: function (streams, ex, assert) {
    streams
      .fold('', function (acc, v) { return acc ? acc + ' ' + v : v; })
      .onValue(function (v) { return assert(v === message); });

    _.each(message.split(' '), function (w) {
      var splitOn = Math.ceil(w.length / 2);
      messages.push(w.substring(0, splitOn));
      keys.push(w.substring(splitOn));
    });
    messages.end();
    keys.end();
  }
};

var testing = {
  'Should produce decoded messages': {
    input: run.input,
    expect: run.expect
  }
};

module.exports = verify(testing, run);
