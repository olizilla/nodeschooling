/*
This problem is the same as the previous problem (HTTP COLLECT) in
that you need to use `http.get()`. However, this time you will be
provided with three URLs as the first three command-line arguments.

You must collect the complete content provided to you by each of the
URLs and print it to the console (stdout). You don't need to print out
the length, just the data as a String; one line per URL. The catch is
that you must print them out in the same order as the URLs are
provided to you as command-line arguments.
*/
var http = require('http')
var concat = require('concat-stream')

var urls = [];
var data = [];
var responseCount = 0;

process.argv.slice(2).forEach(function (item) {
  urls.push(item);
})

urls.forEach(function (item, index) {
  http.get(item, function (req) {
    req.setEncoding('utf8')
    req.pipe(concat(function (res) {
      data[index] = res;
      responseCount++
      if (responseCount === urls.length) {
        console.log(data.join('\n'));
      }
    }))
  })
})
