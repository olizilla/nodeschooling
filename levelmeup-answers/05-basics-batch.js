/*

Write a program that opens a LevelDB data-store using `level`.

The full path to the data-store will be provided to your program as
the first command-line argument.

The second command-line argument will be a full path to a file
containing some data you must load in to the data-store. Each line
of the file will contain two or three strings separated by commas. The
first string will either be "put" or "del", the second string will be
a key and in the case of a "put", the third string will be a value.

For example:

  put,@izs,Isaac Z. Schlueter
  put,@tmpvar,Elijah Insua
  put,@mrbruning,Max Bruning
  del,@darachennis

In this case, you have 3 new entries to add, mapping twitter handles
to real names, and one entry to remove.

You are encouraged to use the `batch()` method for this exercise. A
batch operation is an atomic, and efficient mechanism for performing
multiple writes (put and delete).
*/

var fs = require('fs')
var level = require('level')
var db = level(process.argv[2])

function parseCsv (err, file) {
  if (err) throw err;

  var lines = file.split('\n')

  var ops = lines.map(function (line) {
    return toBatch(line.split(','))
  })

  db.batch(ops)
}

function toBatch (csvLine) {
  var batchItem = {
     type: csvLine[0],
      key: csvLine[1],
    value: csvLine[2]
  }

  if (batchItem.type === 'del') {
    delete batchItem.value
  } // turns out you can omit this as value is ignored for del...

  return batchItem
}

fs.readFile(process.argv[3], 'utf8',  parseCsv)
