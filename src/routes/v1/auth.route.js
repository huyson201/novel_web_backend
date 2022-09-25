const route = require('express').Router()
import passport from 'passport'
import authController from '~/controllers/auth.controller'
import authMiddleware from '~/middlewares/auth.middleware'
import { responseFormat } from '~/utils'
route.post('/login', authController.login)
route.post('/register', authMiddleware, authController.register)
route.post('/logout', authController.logout)
route.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.user)
    return res.status(200).json(responseFormat(req.user))
})

route.get('/me/bookcase', passport.authenticate('jwt', { session: false }), authController.getBookcase)
export default route