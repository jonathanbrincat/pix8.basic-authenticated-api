const router = require('express').Router()

router
  .get('/', (request, response) => {
    response.json({ status: 'Users' })
  })

module.exports = router
