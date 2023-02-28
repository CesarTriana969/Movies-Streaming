const { ExtractJwt, Strategy } = require('passport-jwt')
const passport = require('passport')

const { findUserById } = require('../users/users.controllers')
const config = require('../../config').api

const passportConfigs = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //? 
    secretOrKey: config.secretOrKey
}

passport.use(new Strategy(passportConfigs, (tokenDecoded, done) => {
    findUserById(tokenDecoded.id)
        .then(data => {
            if (data) {
                done(null, tokenDecoded) //? El usuario si Existe y es valido
            } else {
                done(null, false, { message: 'Token Incorrect' }) //? El usuario no existe
            }
        })
        .catch(err => {
            done(err, false) //? Error en la base de datos
        })
}))

module.exports = passport.authenticate('jwt', { session: false })