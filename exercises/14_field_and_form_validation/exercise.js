'use strict';

var verify = require('../../verify.js');
var Bacon = require('baconjs');
var _ = require('lodash');

var fieldA = new Bacon.Bus();
var fieldB = new Bacon.Bus();
var fieldC = new Bacon.Bus();

var fieldAValid = function (v) {
  return v > 0;
};

var fieldBValid = function (v) {
  return v.length > 3;
};

var fieldCValid = function (v) {
  return v < 1;
};

var run = {
  input: [fieldA, fieldAValid, fieldB, fieldBValid, fieldC, fieldCValid],
  expect: function (streams, ex, assert) {
    streams.formValid
      .sampledBy(fieldC)
      .onValue(assert);

    fieldA.push(1);
    fieldB.push('');
    fieldC.push(0);
  }
};

function invert(fun) {
  return function (v) {
    return fun(!v);
  };
}

var testing = {
  'Field A should be invalid if missing': {
    input: run.input,
    expect: function (streams, ex, assert) {
      var unsub = streams.fieldAValid
        .onValue(invert(assert));
      unsub();
    }
  },
  'Field A should be invalid with empty input': {
    input: run.input,
    expect: function (streams, ex, assert) {
      var unsub = streams.fieldAValid
        .sampledBy(fieldA)
        .onValue(invert(assert));

      fieldA.push();
      unsub();
    }
  },
  'Field A should be invalid with invalid input': {
    input: run.input,
    expect: function (streams, ex, assert) {
      var unsub = streams.fieldAValid
        .sampledBy(fieldA)
        .onValue(invert(assert));

      fieldA.push(0);
      unsub();
    }
  },
  'Field A should be valid with valid input': {
    input: run.input,
    expect: function (streams, ex, assert) {
      var unsub = streams.fieldAValid
        .sampledBy(fieldA)
        .onValue(assert);

      fieldA.push(1);
      unsub();
    }
  },
  'Field B should be valid if missing': {
    input: run.input,
    expect: function (streams, ex, assert) {
      var unsub = streams.fieldBValid
        .onValue(assert);
      unsub();
    }
  },
  'Field B should be valid with empty input': {
    input: run.input,
    expect: function (streams, ex, assert) {
      var unsub = streams.fieldBValid
        .sampledBy(fieldB)
        .onValue(assert);

      fieldB.push();
      unsub();
    }
  },
  'Field B should be invalid with invalid input': {
    input: run.input,
    expect: function (streams, ex, assert) {
      var unsub = streams.fieldBValid
        .sampledBy(fieldB)
        .onValue(invert(assert));

      fieldB.push('asd');
      unsub();
    }
  },
  'Field B should be valid after invalid, then empty input': {
    input: run.input,
    expect: function (streams, ex, assert) {
      var unsub = streams.fieldBValid
        .sampledBy(fieldB)
        .skip(1)
        .onValue(assert);

      fieldB.push('asd');
      fieldB.push();
      unsub();
    }
  },
  'Field B should be valid with valid input': {
    input: run.input,
    expect: function (streams, ex, assert) {
      var unsub = streams.fieldBValid
        .sampledBy(fieldB)
        .onValue(assert);

      fieldB.push('asdf');
      unsub();
    }
  },
  'Field C should be invalid if missing': {
    input: run.input,
    expect: function (streams, ex, assert) {
      var unsub = streams.fieldCValid
        .onValue(invert(assert));
      unsub();
    }
  },
  'Field C should be invalid with empty input': {
    input: run.input,
    expect: function (streams, ex, assert) {
      var unsub = streams.fieldCValid
        .sampledBy(fieldC)
        .onValue(invert(assert));

      fieldC.push();
      unsub();
    }
  },
  'Field C should be invalid with invalid input': {
    input: run.input,
    expect: function (streams, ex, assert) {
      var unsub = streams.fieldCValid
        .sampledBy(fieldC)
        .onValue(invert(assert));

      fieldC.push(1);
      unsub();
    }
  },
  'Field C should be valid with valid input': {
    input: run.input,
    expect: function (streams, ex, assert) {
      var unsub = streams.fieldCValid
        .sampledBy(fieldC)
        .onValue(assert);

      fieldC.push(0);
      unsub();
    }
  },
  'Form should be invalid initially': {
    input: run.input,
    expect: function (streams, ex, assert) {
      var unsub = streams.formValid
        .onValue(invert(assert));
      unsub();
    }
  },
  'Form should be invalid if A is invalid, B is missing and C is valid': {
    input: run.input,
    expect: function (streams, ex, assert) {
      var unsub = streams.formValid
        .sampledBy(fieldC)
        .onValue(invert(assert));

      fieldC.push(0);
      unsub();
    }
  },
  'Form should be invalid if A is valid, B is missing and C is invalid': {
    input: run.input,
    expect: function (streams, ex, assert) {
      var unsub = streams.formValid
        .sampledBy(fieldA)
        .onValue(invert(assert));

      fieldA.push(1);
      unsub();
    }
  },
  'Form should be valid if A is valid, B is missing and C is valid': {
    input: run.input,
    expect: function (streams, ex, assert) {
      var unsub = streams.formValid
        .sampledBy(fieldC)
        .onValue(assert);

      fieldA.push(1);
      fieldC.push(0);
      unsub();
    }
  },
  'Form should be invalid if A is valid, B is invalid and C is valid': {
    input: run.input,
    expect: function (streams, ex, assert) {
      var unsub = streams.formValid
        .sampledBy(fieldC)
        .onValue(invert(assert));

      fieldA.push(1);
      fieldB.push('asd');
      fieldC.push(0);
      unsub();
    }
  },
  'Form should be valid if A is valid, B is valid and C is valid': {
    input: run.input,
    expect: function (streams, ex, assert) {
      var unsub = streams.formValid
        .sampledBy(fieldC)
        .onValue(assert);

      fieldA.push(1);
      fieldB.push('asdf');
      fieldC.push(0);
      unsub();
    }
  },
};

module.exports = verify(testing, run);
