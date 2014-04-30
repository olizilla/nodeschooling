/*
In this example, you will be given a readable stream, `counter`, as the first
argument to your program:

    module.exports = function (counter) {
        // return a duplex stream to capture countries on the writable side
        // and pass through `counter` on the readable side
    };

Return a duplex stream with the `counter` as the readable side. You will be
written objects with a 2-character `country` field as input, such as these:

    {"short":"OH","name":"Ohio","country":"US"}
    {"name":"West Lothian","country":"GB","region":"Scotland"}
    {"short":"NSW","name":"New South Wales","country":"AU"}

Create an object to keep a count of all the countries in the input. Once the
input ends, call `counter.setCounts()` with your country counts.

The `duplexer` module will again be very handy in this example.
*/

var util = require('util')
var duplexer = require('duplexer')
var Writable = require('stream').Writable

module.exports = function (counter) {
  var counts = {}

  var ws = Writable({ objectMode: true })
  ws._write = function (chunk, enc, next) {
    var current = counts[chunk.country] || 0;
    counts[chunk.country] = current + 1
    next()
  }

  ws.on('finish', function(){
    counter.setCounts(counts)
  })

  return duplexer(ws, counter)
}
