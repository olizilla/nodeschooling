/*
Write an HTTP server that serves JSON data when it receives a GET
request to the path '/api/parsetime'. Expect the request to contain a
query string with a key 'iso' and an ISO-format time as the value.
For example:

  /api/parsetime?iso=2013-08-10T12:10:15.474Z

The JSON response should contain only 'hour', 'minute' and 'second'
properties. For example:

  {
    "hour": 14,
    "minute": 23,
    "second": 15
  }

Add second endpoint for the path '/api/unixtime' which accepts the
same query string but returns UNIX epoch time under the property
'unixtime'. For example:

  { "unixtime": 1376136615474 }

Your server should listen on port 8000.
*/
var url = require('url')
var http = require('http')

function isoToHourMinSec(date) {
  return {
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  }
}

function isoToUnix(date) {
  return {
    unixtime: date.getTime()
  }
}

var routes = {
  '/api/parsetime': isoToHourMinSec,
  '/api/unixtime': isoToUnix,
}

var server = http.createServer(function(req, res) { 
  var urlObj = url.parse(req.url, true)
  var route = routes[urlObj.pathname]

  if(!route || !urlObj.query || !urlObj.query.iso){
    res.writeHead(404, {'Content-Type': 'application/json'})
    return res.end('{error:"no such route"}')
  }

  var date = new Date(urlObj.query.iso)
  var result = route(date)

  res.writeHead(200, {'Content-Type': 'application/json'})
  res.end(JSON.stringify(result))
})

server.listen(8000)
