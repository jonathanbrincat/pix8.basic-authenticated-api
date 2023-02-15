const router = require('express').Router()
const auth = require('./auth') // token route
const users = require('./users')
const tasks = require('./tasks')

router
  .get('/', (request, response) => {
    response.json({ status: 'API' })
  })
  .use(auth)
  .use('/users', users)
  .use('/tasks', tasks)

module.exports = router
