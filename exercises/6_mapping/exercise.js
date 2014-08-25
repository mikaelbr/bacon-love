'use strict';

var verify = require('../../verify.js');
var Bacon = require('baconjs');
var authors = require('./authors.json');

var run = {
  input: Bacon.sequentially(100, authors),
  expect: function (stream, ex, assert) {
    var expected = authors.map(function (author) {
      return author.name.last + ', ' + author.name.first;
    });
    stream
      .onValue(function (val) {
        assert(val === expected.shift());
      });
  }
};


var testing = {
  'Should emit authornames on the form "first, last"': {
    input: run.input,
    expect: run.expect
  }
};

module.exports = verify(testing, run);
