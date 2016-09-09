var path = require('path');
var exec = require('faithful-exec');
var menu = require('../exercises/menu.json');

function dirFromName (id) {
  return id.toLowerCase()
    .replace(/\s/g, '_')
    .replace(/[^\w]/gi, '');
}

function exerciseNameToTest(name) {
    var dirName = path.join(__dirname, '..', 'exercises', dirFromName(name));
    return {
        name: name,
        file: path.join(dirName, 'solution', 'solution.js')
    };
}

function retryAtMost(maxRetries, fn, lastErrorMessage) {
    if (!maxRetries) {
        throw new Error(lastErrorMessage);
    }

    return fn().then(null, function (reason) {
        return retryAtMost(maxRetries-1, fn, reason.stdout);
    });
}

var tests = menu.map(exerciseNameToTest);

describe('Verify solutions:', function () {
    tests.forEach(function (test) {
        it(test.name, function () {
            this.timeout(30000);
            return exec('node . select "' + test.name + '"').then(function () {
                // Retry a few times if it fails, because the 11_samples exercise may be a little unstable
                return retryAtMost(5, exec.bind({}, 'node . verify ' + test.file));
            });
        });
    });
});
