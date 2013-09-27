/* 
Write a program that uses a single {bold}synchronous{/bold} filesystem operation to
read a file and print the number of newlines it contains to the
console (stdout), similar to running `cat file | wc -l`.

The full path to the file to read will be provided as the first
command-line argument.
*/
var fs = require('fs')

var filename = process.argv[2]
var buf = fs.readFileSync(filename)
var str = buf.toString();
var count = str.split('\n').length

console.log(count - 1)

// note you can avoid the .toString() by passing 'utf8' as the
// second argument to readFileSync, then you'll get a String!
//
// fs.readFileSync(process.argv[2], 'utf8').split('\n').length