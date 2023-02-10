const Sequelize = require('sequelize')
const { db: config } = require('./config')

class Db {
  constructor() {
    Db.orm = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params
    )
  }
}

module.exports = Db
