const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt') // http://www.passportjs.org/packages/passport-jwt/
// const { BearerStrategy } = require(' passport-http-bearer') // http://www.passportjs.org/packages/passport-http-bearer/
// const { OAuth2Strategy } = require(' passport-oauth2') // http://www.passportjs.org/packages/passport-oauth2/
// const session = require('express-session')
const { Users } = require('./models')
const { auth: config } = require('./config')

var instance;

const strategyConfig = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('jwt'),
  // jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // issuer: 'localhost',
  // audience: 'localhost',
}

// const sessionConfig = {
//   secret: config.secret,
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: true }
// }

class Auth {
  constructor() {
    /*
    * register and configure passport authentication strategy.
    * when credentials are successfully parsed locate the matching user in db to identify that user.
    **/
    passport.use(
      new JwtStrategy(strategyConfig, (payload, done) => {
        Users.findById(payload.id)
          .then(user => {
            // success: user found
            if (user) {
              return done(null, {
                id: user.id,
                email: user.email,
              })
              // return done(null, { ...user })
            }

            // failure: user not found
            return done(null, false)
          })
          // error: service fault
          .catch(error => done(error, null))
      })
    )

    /*
    * passport session support for provision of authentication persistence.
    * http is a stateless protocol - adapter to make it stateful to maintain authentication state(via cookies)
    **/
    /*
    // store to passport session
    passport.serializeUser(function (user, callback) {
      process.nextTick(() => {
        return callback(null, {
          id: user.id,
          email: user.email,
        })
      })
    })

    // retrieve from passport session
    passport.deserializeUser(function (user, callback) {
      process.nextTick(() => {
        return callback(null, user)
      })
    })
    */

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

  /*
  session() {
    return session(sessionConfig)
    // return passport.session()
  }
  */
}

module.exports = instance ? instance : new Auth()
