var assert = require('assert');
var semver = require('semver');
var requiredNodeVersion = require('../package.json').engines.node;

describe('Node.js', function () {
    it('is version ' + requiredNodeVersion, function () {
        assert(
            semver.satisfies(process.version, requiredNodeVersion),
            'Node.js is ' + process.version + ', but needs to be version ' + requiredNodeVersion
        );
    })
});