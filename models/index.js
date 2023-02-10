const fs = require('fs')
const path = require('path')
const Db = require('../db')

var instance
var models = {}

class Models extends Db {
  constructor() {
    // JB: Singleton alternative if without self-instantiation
    // if (instance) {
    //   return instance
    // }

    super()

    fs.readdirSync(__dirname, { withFileTypes: true })
      .filter(file => file.isFile() && path.extname(file.name.toLowerCase()) === '.js' && file.name.toLowerCase() !== 'index.js')
      .forEach(file => {

        // TODO: replace import. deprecated in v6
        const model = Db.orm.import(
          path.join(__dirname, file.name)
        )
        models[model.name] = model
        // this[model.name] = model // JB: alternative without opting to return models object
      })

    Object.values(models).forEach((model) => {
      model.associate(models)
    })

    instance = this

    return models // JB: will return object not class instance(no access to constructor once more; added reinforcement of Singleton)
  }
}

// module.exports = Models
module.exports = instance ? instance : new Models() // DEVNOTE: self-instantiating Singleton; class instance not exported so constructor is never exposed
