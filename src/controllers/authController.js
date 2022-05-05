import User from "~/models/User"
import createError from 'http-errors'

export const login = async (req, res, next) => {
    let data = req.body
    try {
        // get user with email and check exist
        let user = await User.findOne({ email: data.email })
        if (!user) return next(createError(400, 'email not exist!'))
        
        // verify password
        let checkPassword = user.comparePassword(data.password, user.password)
        if (!checkPassword) return next(createError(400, 'password not match!'))

        // generate token
        let token = user.generateToken({ _id: user._id, email: user.email })
        let refreshToken = user.generateRefreshToken({ _id: user._id, email: user.email })
        user.refreshToken = refreshToken
        
        await user.save()
        return res.status(200).json({
            data: {
                _id: user._id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
                accessToken: token,
                refreshToken
            }
        })

    } catch (error) {
        console.log(error.message)
        return next(createError(500, error.message))
    }

}

export const register = async (req, res, next) => {

    let { firstName, lastName, ...data } = req.body

    try {
        // check email
        let existUser = await User.findOne({ email: data.email })
        if (existUser) return next(createError(409, 'email exist!'))


        let user = new User({ ...data })
        user.name.first = firstName
        user.name.last = lastName

        // validate email
        let validate = user.validateSync()
        if (validate && validate.errors['email']) return next(createError(400, validate.errors['email']))

        // save value
        await user.save()
        return res.status(201).send('user created!')
    } catch (error) {
        console.log(error.message)
        return next(createError(500, error.message))
    }
}

export const logout = async (req, res, next) => {
    let user = req.user

    try {
        user.refreshToken = null
        await user.save()
        req.logout()
        return res.status(200).json({
            message: "logout success!"
        })
    } catch (error) {
        console.log(error.message)
        return next(createError(500, error.message))
    }
}

