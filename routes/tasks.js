const router = require('express').Router()
const auth = require('../auth')
const { Tasks } = require('../models')

router
  .all('/',
    // auth.authenticate, // JB: can't do this. have to execute. thought it was a callback. need to check docs.
    auth.authenticate(),
    (request, response, next) => {
      delete request.body?.id
      next()
    }
  )
  .get('/', (request, response) => {
    Tasks.findAll({ where: { user_id: request.user.id } })
    // Tasks.findAll({ })
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
    // broken
    console.log('GET post by id => ', request.params.id, ' :: ', request.user.id)

    Tasks.findOne({ where: { id: request.params.id, user_id: request.user.id } })
      .then(data => data ? response.json(data) : response.sendStatus(404))
      .catch(error => response.status(412).json({ msg: error.message }))
  })
  .put('/:id', (request, response) => {
    // broken
    console.log('UPDATE post by id => ', request.params.id, ' :: ', request.user.id)

    Tasks.update(request.body, { where: { id: request.params.id, user_id: request.user.id } })
      .then(() => response.sendStatus(204))
      .catch(error => response.status(412).json({ msg: error.message }))
  })
  .delete('/:id', (request, response) => {
    // broken
    console.log('DESTROY post by id => ', request.params.id, ' :: ', request.user.id)

    Tasks.destroy({ where: { id: request.params.id, user_id: request.user.id } })
      .then(() => response.sendStatus(204))
      .catch(error => response.status(412).json({ msg: error.message }))
  })

module.exports = router
