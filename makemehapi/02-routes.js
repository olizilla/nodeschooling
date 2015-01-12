var Hapi = require('Hapi')
var server = new Hapi.Server()

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
})

server.route({
  path:'/{name}',
  method: 'GET',
  handler: name
})

function name (req, reply) {
  reply('Hello ' + req.params.name)
}

server.start()
