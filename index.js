const express = require('express'),
  server = express()

const PORT = 3001

server.set('port', PORT)

server.get('/', (request, response) => {
  response.send('Hello!')
})

server.listen(
  server.get('port'), () => console.log(`\nAPI running on http://localhost:${server.get('port')}`)
)

