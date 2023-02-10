const express = require('express'),
  server = express()
const bodyParser = require('body-parser')
const router = require('./routes')
const Db = require('./db')
const { port } = require('./config')

server.set('port', port)
server.set('json spaces', 2)

server.use(bodyParser.json())
server.use(router)

Db.orm.sync({ force: true })
  .then(() => {
    server.listen(
      server.get('port'), () => console.log(`\nAPI running on http://localhost:${server.get('port')}`)
    )
  })
