const router = require('express').Router()
const auth = require('../auth')
const { users } = require('../models')

router
  .post('/', (request, response) => {
    users.create(request.body)
      .then(data => response.status(200).json(data))
      .catch(error => response.status(412).json({ msg: error.message }))
  })
  // .all('/', auth().authenticate)
  .all('/', auth.authenticate)
  // .get('/', auth.authenticate, (request, response) => {
  .get('/', (request, response) => {

    users.findById(request.user.id, {
      attributes: ['id', 'name', 'email']
    })
      .then(data => response.status(200).json(data))
      .catch(error => response.status(412).json({ msg: error.message }))
  })
  .delete('/', (request, response) => {

    users.destroy({ where: request.user.id })
      .then(() => response.sendStatus(204))
      .catch(error => response.status(412).json({ msg: error.message }))
  })

module.exports = router
