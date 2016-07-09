'use strict';

var semver = require('semver');
var requiredNodeVersion = require('./package.json').engines.node;

module.exports = function () {
    var isOkNodeVersion = semver.satisfies(process.versions.node, requiredNodeVersion);
    if (!isOkNodeVersion) {
        console.error('bacon-love needs Node.js version ' + requiredNodeVersion + ', but found ' +
            'to be running Node.js ' + process.version);
        process.exit(1);
    }
};