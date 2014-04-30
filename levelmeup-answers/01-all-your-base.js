/*
To get into the rhythm, let's do a simple hello world.

Write a Node program that accepts two command-line arguments, X and
Y and prints out to the console the following text:

  ALL YOUR X ARE BELONG TO Y
*/

var x = process.argv[2]
var y = process.argv[3]

console.log('ALL YOUR ' + x + ' ARE BELONG TO ' + y)

// notes...
// I forgot about sprintf style skills in console.log('ALL YOUR %s ARE BELONG TO %s', x, y)
