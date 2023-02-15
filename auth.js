const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const { Users } = require('./models')
const { auth: config } = require('./config')

var instance;

const params = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeader() //.fromAuthHeaderAsBearerToken('jwt') => v3 onwards
}

class Auth {
  constructor() {
    const strategy = new Strategy(params, (payload, done) => {
      Users.findById(payload.id)
        .then(user => {
          if (user) {
            return done(null, {
              id: user.id, // JB: this is were request.user.id originates from in routes
              email: user.email,
            })
          }

          return done(null, false)
        })
        .catch(error => done(error, null))
    })

    passport.use(strategy)

    instance = this
  }

  authenticate(request, response, next) {
    return passport.authenticate('jwt', config.session)  // JB: passport.authenticate is already a middleware handler and so no need for next()
  }

  initialise() {
    return passport.initialize() // JB: optional middleware that adds passport instance to incoming requests so that authentication strategy can proceed
    // https://stackoverflow.com/questions/46644366/what-is-passport-initialize-nodejs-express
    // https://stackoverflow.com/questions/56590177/unable-to-understand-requirement-of-passport-initialize-middleware
    // Middlewares are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle; hence this is how the magic happens that attaches id and email to the request body
  }
}

module.exports = instance ? instance : new Auth()
