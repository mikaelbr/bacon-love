'use strict';

var verify = require("../../verify.js");

var run = {
    input: void 0,
    expect: function (stream, ex, done) {
        var expected = 6;
        stream
            .fold(0, function (a, b) {
                return a + b;
            })
            .onValue(function (val) {
                done(val !== expected);
            });
    }
};


var testing = {
    'Should emit values that sum up to 6': {
        input: run.input,
        expect: run.expect
    }
};

module.exports = verify(testing, run);
