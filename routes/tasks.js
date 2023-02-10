const router = require('express').Router()
const auth = require('../auth')
const { tasks } = require('../models')

router
  .all('/',
    auth.authenticate,
    (request, response, next) => {
      delete request.body?.id
      next()
    }
  )
  .get('/', (request, response) => {
    tasks.findAll({ where: { user_id: request.user.id } })
      .then(data => response.status(200).json(data))
      .catch(error => response.status(412).json({ msg: error.message }))
  })
  .post('/', (request, response) => {
    request.body.user_id = request.user.id

    tasks.create(request.body)
      .then(data => response.status(200).json({ tasks: data }))
      .catch(error => response.status(412).json({ msg: error.message }))
  })
  .get('/:id', (request, response) => {
    tasks.findOne({ where: { id: request.params.id, user_id: request.user.id } })
      .then(data => data ? response.json(data) : response.sendStatus(404))
      .catch(error => response.status(412).json({ msg: error.message }))
  })
  .put('/:id', (request, response) => {
    tasks.update(request.body, { where: { id: request.params.id, user_id: request.user.id } })
      .then(() => response.sendStatus(204))
      .catch(error => response.status(412).json({ msg: error.message }))
  })
  .delete('/:id', (request, response) => {
    tasks.destroy({ where: { id: request.params.id, user_id: request.user.id } })
      .then(() => response.sendStatus(204))
      .catch(error => response.status(412).json({ msg: error.message }))
  })

module.exports = router
