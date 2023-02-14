const router = require('express').Router()
const auth = require('../auth')
const { Users } = require('../models')
const models = require('../models')

router
  .post('/', (request, response) => {
    Users.create(request.body)
      .then(data => response.status(200).json(data))
      .catch(error => response.status(412).json({ msg: error.message }))
  })
  // .all('/', auth().authenticate) // JB: can't do this. have to execute. thought it was a callback. need to check docs.
  .all('/', auth.authenticate())
  // .get('/', auth.authenticate(), (request, response) => {
  .get('/', (request, response) => {

    Users.findById(request.user.id, {
      attributes: ['id', 'name', 'email']
    })
      .then(data => response.status(200).json(data))
      .catch(error => response.status(412).json({ msg: error.message }))
  })
  .delete('/', (request, response) => {

    Users.destroy({ where: { id: request.user.id } })
      .then(() => response.sendStatus(204))
      .catch(error => response.status(412).json({ msg: error.message }))
  })

module.exports = router
