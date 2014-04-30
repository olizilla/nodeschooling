/*
Write a program that opens a LevelDB data-store using `level`.

The store will contain up to 10 entries with keys in the form:

  gibberishX

Where 'X' is an integer between 0 and 100.

You must find those entries and print them out to the console, ordered
by 'X', ascending. You should print them out with:

  console.log(key + '=' + value)

The full path to the data-store will be provided to your program as
the first command-line argument.
*/

var level = require('level')
var db = level(process.argv[2])

function fetch (first, last) {
  if(first === last) return

  var key = 'gibberish' + first

  db.get(key, function (err, value) {
    if (err && !err.notFound) throw err

    if(!err || !err.notFound) {
        console.log(key + '=' + value)
    }

    fetch(first + 1, last)
  })
}

fetch(0, 100)


// alternateive, pervy style.

// var records = []
//
// for (var x = 0; x <= 100; x++) load('gibberish', x, records)
//
// function load (key, index, records) {
//   db.get(key + index, function (err, value) {
//     if (err && err.notFound) return
//     if (err) throw err
//
//     records[index] = key + index + '=' + value
//
//     if(Object.keys(records).length === 10){
//       records.forEach(function (rec) {
//         console.log(rec)
//       })
//     }
//   })
// }

// original answer... has potential ordering issues

// for (var x = 0; x <= 100; x++) {
//   getAndPrint('gibberish' + x)
// }
//
// function getAndPrint (key) {
//   db.get(key, function (err, value) {
//     if (err && err.notFound) return
//     if (err) throw err
//
//     console.log(key + '=' + value)
//   })
// }
