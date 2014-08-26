'use strict';

var verify = require('../../verify.js');
var Bacon = require('baconjs');
var _ = require('lodash');
var authors = require('./authors.json');

function authorName(author) {
  return author.name.last + ', ' + author.name.first;
}

function validate(stream, expected) {
  return stream
    .fold([], '.concat')
    .map(function (v) {
      return _.isEqual(v, expected);
    });
}

var authorNames = authors.map(authorName);
var popularAuthors = authors.filter(function (a) {
  return a.readers > 10000;
});
var popularAuthorNames = popularAuthors.map(authorName);

var run = {
  input: Bacon.sequentially(100, authors),
  expect: function (streams, ex, assert) {
    validate(streams.a, authorNames)
      .and(validate(streams.b, popularAuthors))
      .and(validate(streams.c, popularAuthorNames))
      .onValue(assert);
  }
};


var testing = {
  'Should emit the names of all authors on the form "first, last"': {
    input: run.input,
    expect: function (streams, ex, assert) {
      validate(streams.a, authorNames).onValue(assert);
    }
  },
  'Should all popular authors': {
    input: run.input,
    expect: function (streams, ex, assert) {
      validate(streams.b, popularAuthors).onValue(assert);
    }
  },
  'Should emit the names of all popular authors on the form "first, last"': {
    input: run.input,
    expect: function (streams, ex, assert) {
      validate(streams.c, popularAuthorNames).onValue(assert);
    }
  }
};

module.exports = verify(testing, run);
