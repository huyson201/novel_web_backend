import express from "express";
import { login, logout, refreshAccessToken, register } from "~/controllers/authController";
import { loginMiddleware, registerMiddleware } from "~/middleware/auth";
import passport from 'passport'
import { handleExpressValidateError } from "~/middleware";
import BookCategory from "~/models/BookCategory";
const route = express.Router()

route.post('/login', loginMiddleware(), handleExpressValidateError, login)

route.post('/register', registerMiddleware(), handleExpressValidateError, register)
route.post('/logout', passport.authenticate('jwt', { session: false }), logout)
route.post('/refresh-token', refreshAccessToken)
route.get('/', async (req, res) => {
    // let obj = new BookCategory({ bookId: '627512f47c340eae13edaae3', categoryId: '627543cbb08ddfee49c9a6e5' })
    // await obj.save()
    // return res.json({})


    let data = await BookCategory.find({ booId: '627512f47c340eae13edaae3' })
        .populate('categoryId', '_id name slug')
        .select("categoryId -_id")
    return res.status(200).json({
        data
    })
})

export default route