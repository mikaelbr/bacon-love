'use strict';

var verify = require('../../verify.js');
var Bacon = require('baconjs');
var _ = require('lodash');
var authors = require('./authors.json');

var run = {
  input: Bacon.sequentially(100, authors),
  expect: function (stream, ex, assert) {
    var expected = authors.map(function (author) {
      return author.name.last + ', ' + author.name.first;
    });
    stream
      .fold([], function (acc, obj) {
        acc.push(obj);
        return acc;
      })
      .onValue(function (val) {
        assert(_.isEqual(val, expected));
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
