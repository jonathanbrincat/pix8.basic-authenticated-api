const router = require('express').Router()

router
  .get('/auth', (request, response) => {
    response.json({ status: 'Auth' })
  })

module.exports = router
