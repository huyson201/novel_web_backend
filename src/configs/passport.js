import passport from 'passport'
import { Strategy as JwtStrategy } from 'passport-jwt'
import 'dotenv/config'
import prisma from '~/models';
import redisClient from '~/databases/int.redis';
import { parseDataFromString } from '~/utils';
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
        // 

        let cacheUser = await redisClient.get(`profile::${jwt_payload.id}-${jwt_payload.uid}`)
        cacheUser = parseDataFromString(cacheUser)

        if (cacheUser) return done(null, { ...cacheUser })

        let user = await prisma.user.findUnique({ where: { email: jwt_payload.email } })

        if (!user) return done(null, false);

        redisClient.set(`profile::${user.id}-${user.uid}`, JSON.stringify(user), 'EX', 60 * 5)

        return done(null, { ...user });
    } catch (error) {
        return done(error, false);
    }

}));