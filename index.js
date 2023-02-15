const express = require('express'),
      server = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const auth = require('./auth')
const router = require('./routes')
const Db = require('./db')
const { port, cors: config } = require('./config')

server.set('port', port)
server.set('json spaces', 2)

server.use(cors(config))
server.use(bodyParser.json())
server.use(auth.initialise())
// server.use(auth.session())
server.use(router)

Db.orm.sync({ force: true })
  .then(() => {
    server.listen(
      server.get('port'), () => console.log(`\nAPI running on http://localhost:${server.get('port')}`)
    )
  })
