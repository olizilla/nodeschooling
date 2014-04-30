/*
Write a program that prints all of the key/value pairs in a LevelDB
store to the console. You will be provided with the location of the
store as the first argument on the command-line.

Each entry should be printed on a new line to stdout in the form:

key=value
*/

var level = require('level')
var db = level(process.argv[2])

db.createReadStream()
  .on('data', function (data) {
    console.log('%s=%s', data.key, data.value)
  })
