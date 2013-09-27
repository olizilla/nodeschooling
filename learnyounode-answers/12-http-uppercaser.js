/*
Write an HTTP server that receives only POST requests and converts
incoming POST body characters to upper-case and returns it to the
client.

Your server should listen on port 8000.
*/
var http = require('http')
var map = require('through2-map')

var server = http.createServer(function (req, res) {
  if (req.method != 'POST') {
    res.end();
    return console.log('Ignoring %s request. I am POST only', req.method)
  }
  
  req.pipe(map(toUpper)).pipe(res);
})

function toUpper (chunk) {
  return chunk.toString().toUpperCase();
}

server.listen(8000)