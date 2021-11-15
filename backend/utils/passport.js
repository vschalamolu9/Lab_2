"use strict"
const passport = require('passport')
const secret = 'secret_key_ubereats'
const User = require('../models/userModel')
const Restaurant = require('../models/restaurantModel')
const jwt = require('jsonwebtoken')

function auth(){
    const JWTStrategy = require('passport-jwt').Strategy;
    const ExtractJWT = require('passport-jwt').ExtractJwt;

    passport.use(
        new JWTStrategy({
            secretOrKey: secret,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
            async(token, done) => {
                try{
                    console.log(token)
                    return done(null, token.user);
                }
                catch(error){
                    done(error)
                }
            }
            )
    )
}

exports.auth = auth;
exports.checkAuth = passport.authenticate('jwt', {session: false})