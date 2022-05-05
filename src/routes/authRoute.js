import express from "express";
import { login, logout, refreshAccessToken, register } from "~/controllers/authController";
import passport from 'passport'
const route = express.Router()

route.post('/login', login)
route.post('/register', register)
route.post('/logout', passport.authenticate('jwt', { session: false }), logout)
route.post('/refresh-token', refreshAccessToken)
route.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ data: req.user })
})

export default route