/*
Write a module that returns a readable/writable stream using the
`stream-combiner` module. You can use this code to start with:

    var combine = require('stream-combiner')

    module.exports = function () {
        return combine(
            // read newline-separated json,
            // group books into genres,
            // then gzip the output
        )
    }

Your stream will be written a newline-separated JSON list of science fiction
genres and books. All the books after a `"type":"genre"` row belong in that
genre until the next `"type":"genre"` comes along in the output.

    {"type":"genre","name":"cyberpunk"}
    {"type":"book","name":"Neuromancer"}
    {"type":"book","name":"Snow Crash"}
    {"type":"genre","name":"space opera"}
    {"type":"book","name":"A Deepness in the Sky"}
    {"type":"book","name":"Void"}

Your program should generate a newline-separated list of JSON lines of genres,
each with a `"books"` array containing all the books in that genre. The input
above would yield the output:

    {"name":"cyberpunk","books":["Neuromancer","Snow Crash"]}
    {"name":"space opera","books":["A Deepness in the SKy","Void"]}

Your stream should take this list of JSON lines and gzip it with
`zlib.createGzip()`.
*/
var zlib = require('zlib')
var split = require('split')
var through = require('through')
var combine = require('stream-combiner')


module.exports = function () {
    var current

    return combine(
        // read newline-separated json,
        split(),

        // group books into genres,
        through(
          function write (line) {

            if (!line) return
            var entry = JSON.parse(line)

            if (entry.type === 'genre') {
              if (current) {
                this.queue(JSON.stringify(current) +'\n')
              }

              current = {
                name: entry.name,
                books: []
              }
            }
            else if (entry.type === 'book') {
              current.books.push(entry.name)
            }
          },

          function end () {
            if(current) {
              this.queue(JSON.stringify(current) +'\n')
            }
            this.queue(null)
          }
        ),

        // then gzip the output
        zlib.createGzip()
    )
}


// forgot that through can accpets a write and end function...
/*
module.exports = function () {
    var current

    return combine(
        // read newline-separated json,
        split(),

        // group books into genres,
        through(function (buf) {
          var line = buf.toString()

          if (!line) { // end o stream...
            this.queue(JSON.stringify(current) +'\n')
            return
          }

          var entry = JSON.parse(line)

          if (entry.type === 'genre') {
            if (current) {
              this.queue(JSON.stringify(current) +'\n')
            }

            current = {
              name: entry.name,
              books: []
            }
          }
          if (entry.type === 'book') {
            current.books.push(entry.name)
          }
        }),

        // then gzip the output
        zlib.createGzip()
    )
}
*/
