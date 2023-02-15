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

console.log(Db.orm.models) // globally accesible helper to attached models. can potentially be used in place of my singleton https://sequelize.org/v5/class/lib/sequelize.js~sequelize
