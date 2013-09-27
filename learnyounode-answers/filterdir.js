/*
05-fitered-ls continued...

This problem is the same as the previous but introduces the concept of
modules. You will need to create two files to solve this.

Create a program that prints a list of files in a given directory,
filtered by the extension of the files. The first argument is the
directory name and the second argument is the extension filter. Print
the list of files to the console. You must use asynchronous I/O.

Your program must use a module to do most of the work. The module
must export a single function that takes three arguments: the
directory name, the filter string and a callback function.

The callback must return an error, and only an error, as the first
argument if one is passed from your call to `fs.readdir()`. If there
are no errors then the first argument to the callback must be null and
the second must be your filtered list of files in an array.

In the case of an error bubbling up to your original program file,
simply check for it and print an informative message to the console.
*/
var fs = require('fs')

module.exports = function (dir, filter, cb) {

  var extFilter = new RegExp('\\.' + filter + '$')

  var result = []

  fs.readdir(dir, function (err, list) {
    if (err){
      return cb(err)
    }
    list.forEach(function (item) {
      if (extFilter.test(item)){
        result.push(item)
      }
    })
    cb(null, result);
  })
}