const route = require('express').Router()
import passport from 'passport'
import authController from '~/controllers/auth.controller'
import authMiddleware from '~/middlewares/auth.middleware'
route.post('/login', authController.login)
route.post('/register', authMiddleware, authController.register)
route.post('/logout', authController.logout)
route.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ user: req.user })
})
export default route