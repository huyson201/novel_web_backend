const route = require('express').Router()
import passport from 'passport'
import authController from '~/controllers/auth.controller'
import { createValidateRequest } from '~/middlewares/common'
import {
    bookcaseValidators,
    authRequestValidators

} from '~/validations'


route.post('/login',
    createValidateRequest(authRequestValidators.loginValidator, 401),
    authController.login
)

route.post('/register',
    createValidateRequest(authRequestValidators.registerValidator, 401),
    authController.register
)

route.post('/logout',
    passport.authenticate('jwt', { session: false }),
    authController.logout
)

route.post('/refresh-token',
    authController.refreshToken
)

route.get('/me',
    passport.authenticate('jwt', { session: false }),
    authController.getProfile
)

route.post('/me/update/name',
    passport.authenticate('jwt', { session: false }),
    createValidateRequest(authRequestValidators.changeUsernameValidator, "body", 400),
    authController.updateUsername
)

route.post('/me/update/password',
    passport.authenticate('jwt', { session: false }),
    createValidateRequest(authRequestValidators.changePasswordValidator, "body", 400),
    authController.changePasswd
)


/**
 * Bookcase routes
 */
route.get('/me/bookcase',
    passport.authenticate('jwt', { session: false }),
    authController.getBookcase
)
route.delete('/me/bookcase/delete',
    passport.authenticate('jwt', { session: false }),
    createValidateRequest(bookcaseValidators.delBookcaseValidator, "query", 400),
    authController.deleteBookcaseById
)
route.post('/me/bookcase/add',
    passport.authenticate('jwt', { session: false }),
    createValidateRequest(bookcaseValidators.addBookcaseValidator, "body", 400),
    authController.addBookcase
)
route.get('/me/bookcase/find/:book_id',
    passport.authenticate('jwt', { session: false }),
    createValidateRequest(bookcaseValidators.getBookcaseByIdValidator, "params", 400),
    authController.getBookcaseById
)


export default route