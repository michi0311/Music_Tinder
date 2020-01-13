const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const JWTSECRET = "Music Tinder";
const path = require("path")

const user = require(path.normalize("../../database/models/index")).User;

let extractJWT = passportJWT.ExtractJwt;
let JWTStrategy = passportJWT.Strategy;
let JWTOptions = {};

JWTOptions.jwtFromRequest = extractJWT.fromAuthHeaderAsBearerToken();
JWTOptions.secretOrKey = JWTSECRET

let strategy = new JWTStrategy(JWTOptions, async function (jwt_payload, next) { 
    console.log("payload received", jwt_payload);
    let logUser = undefined;
    if (jwt_payload.id) {
        try {
            logUser = await user.findOne({ where: { id: jwt_payload.id } }); // if jwt has no id ret false
        } catch(e) {
            console.log(e);
            next(null,false)
        }
            
    } 

    if (logUser && jwt_payload.exp >= Math.round(Date.now() / 1000)) { 
        next(null, logUser);
    } else {
        next(null, false);
    }

});

passport.use(strategy);

module.exports = passport;