const router = require('express').Router()
const { users } = require('../models')

router
  .post('/auth', (request, response) => {

    if(request.body.email && request.body.password) {
      const { email, password } = request.body

      users.findOne({ where: { email: email } })
        .then(user => {
          if (users.isPassword(user.password, password)) {
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
