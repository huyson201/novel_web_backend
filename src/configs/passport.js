import passport from 'passport'
import { Strategy as JwtStrategy } from 'passport-jwt'
import 'dotenv/config'
import prisma from '~/models';
const opts = {}
const cookieExtractor = function (req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['auth.access_token'];
    }
    return token;
};
opts.jwtFromRequest = cookieExtractor
opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET;
passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
        let user = await prisma.user.findUnique({ where: { email: jwt_payload.email } })
        if (!user) return done(null, false);
        return done(null, { ...user, password: undefined });
    } catch (error) {
        return done(error, false);
    }

}));