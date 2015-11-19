var path = require('path');
var exec = require('faithful-exec');
var menu = require('../exercises/menu.json');
var dirFromName = require('workshopper/util').dirFromName;

function exerciseNameToTest(name) {
    var dirName = dirFromName(path.join(__dirname, '..', 'exercises'), name);
    return {
        name: name,
        file: path.join(dirName, 'solution', 'solution.js')
    };
}

var tests = menu.map(exerciseNameToTest);

describe('Verify solutions:', function () {
    tests.forEach(function (test) {
        it(test.name, function () {
            this.timeout(5000);
            return exec('node . select "' + test.name + '"')
                .then(function () {
                    return exec('node . verify ' + test.file)
                        .then(null, function (reason) {
                            throw new Error(reason.stdout);
                        });
                });
        });
    });
});
