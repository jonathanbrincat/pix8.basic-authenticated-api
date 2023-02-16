const router = require('express').Router()
const users = require('./users')
const tasks = require('./tasks')

router
  .get('/', (request, response) => {
    response.json({ status: 'API' })
  })
  .use('/users', users)
  .use('/tasks', tasks)

module.exports = router
