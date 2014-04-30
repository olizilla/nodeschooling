/*
Write a program that opens a LevelDB data-store using `level`.

The full path to the data-store will be provided to your program as
the first command-line argument.

The second command-line argument is a string containing a complete
JSON-encoded object. Parse this object and put each property of
the object into your data-store where the property name is the entry's
key and the property value is the entry's value.

Your solution will be verified by reading the data-store and checking
against the object that was provided to you.
*/

var level = require('level')
var db = level(process.argv[2])

var data = JSON.parse(process.argv[3])

Object.keys(data).forEach(function (key) {
  db.put(key, data[key])
})
