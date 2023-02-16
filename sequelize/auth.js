const { Users } = require('./models')
const { auth: config } = require('./config')

var instance;

const strategyConfig = {
  secretOrKey: config.secret,
}

class Auth {
  constructor() {
    instance = this
  }
}

module.exports = instance ? instance : new Auth()
