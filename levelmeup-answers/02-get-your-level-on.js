/*
Write a program that opens a LevelDB data-store using `level`.

Fetch and print to the console the value associated with the key
'levelmeup'.

The first command-line argument to your program will be the full path
to the directory containing the LevelDB store.
*/

var level = require('level')
var db = level(process.argv[2])
db.get('levelmeup', function (err, value) {
  console.log(value)
})
