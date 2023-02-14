const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const { Users } = require('./models')
const { auth: config } = require('./config')

var instance;

const params = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeader() //.fromAuthHeaderAsBearerToken()
}

class Auth {
  constructor() {
    const strategy = new Strategy(params, (payload, done) => {
      Users.findById(payload.id)
        .then(user => {
          if (user) {
            return done(null, {
              id: user.id,
              email: user.email,
            })
          }

          return done(null, false)
        })
        .catch(error => done(error, null))
    })

    passport.use(strategy)

    instance = this

    // return passport.initialize()
  }

  authenticate() {
    console.log('-- Authenticated route --')
    return passport.authenticate('jwt', config.session)
  }

  initialise() {
    return passport.initialize()
  }
}

module.exports = instance ? instance : new Auth()
