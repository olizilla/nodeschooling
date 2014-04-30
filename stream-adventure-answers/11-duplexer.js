/*
Write a program that exports a function that spawns a process from a `cmd`
string and an `args` array and returns a single duplex stream joining together
the stdin and stdout of the spawned process:

    var spawn = require('child_process').spawn;

    module.exports = function (cmd, args) {
        // spawn the process and return a single stream
        // joining together the stdin and stdout here
    };

There is a very handy module you can use here: duplexer. The duplexer module
exports a single function `duplexer(writable, readable)` that joins together a
writable stream and readable stream into a single, readable/writable duplex
stream.
*/

var duplexer = require('duplexer')
var spawn = require('child_process').spawn

module.exports = function (cmd, args) {
  var ps = spawn(cmd, args)
  return duplexer(ps.stdin, ps.stdout)
}
