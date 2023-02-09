const router = require('express').Router()

router
  .get('/', (request, response) => {
    response.json({ status: 'Tasks' })
  })

module.exports = router
