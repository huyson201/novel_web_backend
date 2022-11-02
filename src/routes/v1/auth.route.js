const route = require('express').Router()
import passport from 'passport'
import authController from '~/controllers/auth.controller'
import authMiddleware from '~/middlewares/auth.middleware'
import { responseFormat } from '~/utils'
route.post('/login', authController.login)
route.post('/register', authMiddleware, authController.register)
route.post('/logout', authController.logout)
route.post('/refresh-token', authController.refreshToken)

route.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.status(200).json(responseFormat(req.user))
})

route.get('/me/bookcase', passport.authenticate('jwt', { session: false }), authController.getBookcase)
route.delete('/me/bookcase/delete', passport.authenticate('jwt', { session: false }), authController.deleteBookcaseById)
route.post('/me/bookcase/add', passport.authenticate('jwt', { session: false }), authController.addBookcase)
route.get('/me/bookcase/find/:book_id', passport.authenticate('jwt', { session: false }), authController.getBookcaseById)
route.post('/me/update/name', passport.authenticate('jwt', { session: false }), authController.updateUsername)
route.post('/me/update/password', passport.authenticate('jwt', { session: false }), authController.getBookcase)

export default route