import User from '~/models/User';
import passport from 'passport'
import 'dotenv/config';


const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_ACCESS_SECRET_KEY;

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findById(jwt_payload._id, function (err, user) {
        if (err) {
            return done(err, false)
        }
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    })
}));