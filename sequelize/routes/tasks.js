const router = require('express').Router()
const { Tasks } = require('../models')

router
  .all('/:id?',
    (request, response, next) => {
      delete request.body?.id
      next()
    }
  )
  .get('/', (request, response) => {

    Tasks.findAll({ where: { user_id: request.user.id } })
      .then(data => response.status(200).json(data))
      .catch(error => response.status(412).json({ msg: error.message }))
  })
  .post('/', (request, response) => {

    request.body.user_id = request.user.id

    Tasks.create(request.body)
      .then(data => response.status(200).json({ tasks: data }))
      .catch(error => response.status(412).json({ msg: error.message }))
  })
  .get('/:id', (request, response) => {

    Tasks.findOne({ where: { id: request.params.id, user_id: request.user.id } })
      .then(data => data ? response.json(data) : response.sendStatus(404))
      .catch(error => response.status(412).json({ msg: error.message }))
  })
  .put('/:id', (request, response) => {

    Tasks.update(request.body, { where: { id: request.params.id, user_id: request.user.id } })
      .then(() => response.sendStatus(204))
      .catch(error => response.status(412).json({ msg: error.message }))
  })
  .delete('/:id', (request, response) => {

    Tasks.destroy({ where: { id: request.params.id, user_id: request.user.id } })
      .then(() => response.sendStatus(204))
      .catch(error => response.status(412).json({ msg: error.message }))
  })

module.exports = router
