const jwt = require('jwt-simple')
const router = require('express').Router()
const { Users } = require('../models')
const { auth } = require('../config')

router
  // .post('/auth', (request, response) => {
  .post('/token', (request, response) => {

    if(request.body.email && request.body.password) {
      const { email, password } = request.body

      Users.findOne({ where: { email: email } })
        .then(user => {
          if (Users.isPassword(user.password, password)) {
            const payload = { id: user.id }

            response.json({
              token: jwt.encode(payload, auth.secret)
            })
          } else {
            response.sendStatus(401)
          }
        })
        .catch(error => response.sendStatus(401))
    } else {
      response.sendStatus(401)
    }
  })

module.exports = router
