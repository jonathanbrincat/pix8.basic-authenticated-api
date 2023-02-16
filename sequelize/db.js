const Sequelize = require('sequelize')
const { db: config } = require('./config')

class Db {
  constructor() {
    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params
    )

    // test database connection
    sequelize.authenticate()
      .then(() => console.log('*** Database connection successfully established ***'))
      .catch((error) => console.log('Unable to connect to the database ::', error))

    Db.orm = sequelize
  }
}

module.exports = Db
