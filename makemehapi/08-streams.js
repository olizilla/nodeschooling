var fs = require('fs')
var rot13 = require('rot13-transform')
var Hapi = require('hapi')
var server = new Hapi.Server()

server.connection({
  host: 'localhost',
  port: Number(process.argv[2]||8080)
})

server.route({
  path: '/',
  method: 'GET',
  handler: function (req, reply){
    reply(
      fs.createReadStream('file.txt')
      .pipe(rot13())
    )

  }
})

server.start()