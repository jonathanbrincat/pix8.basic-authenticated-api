const express = require('express'),
  server = express()
const bodyParser = require('body-parser')
const router = require('./routes')

const PORT = 3001

server.set('port', PORT)
server.set('json spaces', 2)

server.use(bodyParser.json())
server.use(router)

server.listen(
  server.get('port'), () => console.log(`\nAPI running on http://localhost:${server.get('port')}`)
)

