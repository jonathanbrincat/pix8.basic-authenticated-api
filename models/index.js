const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const { db } = require('../config')

var instance
var models = {}

class Models {
  constructor() {
    // if (instance) {
    //   return instance
    // }

    const sequelize = new Sequelize(
      db.database,
      db.username,
      db.password,
      db.params
    )

    fs.readdirSync(__dirname, { withFileTypes: true })
      .filter(file => file.isFile() && path.extname(file.name.toLowerCase()) === '.js' && file.name.toLowerCase() !== 'index.js')
      .forEach(file => {

        // TODO: replace import. deprecated in v6
        const model = sequelize.import(
          path.join(__dirname, file.name)
        )
        models[model.name] = model
      })

    Object.values(models).forEach((model) => {
      model.associate(models)
    })

    instance = this

    return models
  }
}

// module.exports = Models
module.exports = instance ? instance : new Models() // DEVNOTE: self-instantiating Singleton; class not exported so constructor is never exposed
