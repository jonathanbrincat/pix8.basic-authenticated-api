const Sequelize = require('sequelize')
const { db } = require('../config')

var instance;

class Models {
  constructor() {
    if (instance) {
      return instance
    }

    const sequelize = new Sequelize(
      db.database,
      db.username,
      db.password,
      db.params
    )

    instance = this
  }
}

module.exports = Models
