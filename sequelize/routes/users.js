const router = require('express').Router()
const { Users } = require('../models')

router.route('/')
  .post((request, response) => {

    Users.create(request.body)
      .then(data => response.status(200).json(data))
      .catch(error => response.status(412).json({ msg: error.message }))
  })
  .get((request, response) => {

    Users.findByPk(request.user.id, {
      attributes: ['id', 'name', 'email']
    })
      .then(data => response.status(200).json(data))
      .catch(error => response.status(412).json({ msg: error.message }))
  })
  .delete((request, response) => {

    Users.destroy({ where: { id: request.user.id } })
      .then(() => response.sendStatus(204))
      .catch(error => response.status(412).json({ msg: error.message }))
  })

module.exports = router
