var tape = require('tape');

var call = function (fn) { fn(); };

function suite (name, cb) {
    var beforeEach = [];
    var afterEach = [];

    var beforeRun = false;

    var runTest = function (cb) {
        return function (t) {
            beforeEach.forEach(call);
            cb(t);
            afterEach.forEach(call);
        };
    };

    var _suite = {
        beforeEach: beforeEach.push.bind(beforeEach),
        afterEach: afterEach.push.bind(afterEach),

        test: function (name, cb) {
            tape(name, runTest(cb));
        }
    };

    _suite.test.only = function (name, cb) {
        tape.only(name, runTest(cb));
    };

    cb(_suite);
}

module.exports = suite;
