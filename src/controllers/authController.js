import User from "~/models/User"
import createError from 'http-errors'

export const login = async (req, res, next) => {
    let data = req.body
    try {
        // get user with email and check exist
        let user = await User.findOne({ email: data.email })
        // verify password
        let checkPassword = user.comparePassword(data.password, user.password)
        if (!checkPassword) return next(createError(400, 'password not match!'))

        // generate token
        let token = user.generateToken()
        let refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken

        await user.save()
        return res.status(200).json({
            data: {
                ...user.toJSON(),
                password: undefined,
                accessToken: token,
                refreshToken
            }
        })

    } catch (error) {
        next(createError(500, error.message))
    }

}

export const register = async (req, res, next) => {

    let data = req.body

    try {

        let user = new User({ ...data })

        // save value
        await user.save()
        return res.status(201).send('user created!')
    } catch (error) {
        next(createError(500, error.message))
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
        next(createError(500, error.message))
    }
}

export const refreshAccessToken = async (req, res, next) => {
    let { refreshToken } = req.body
    try {
        let user = await User.findOne({ refreshToken })
        if (!user) next(createError(400, 'refreshToken not exist'))
        let accessToken = user.generateToken()
        return res.status(200).json({
            data: {
                accessToken
            }
        })

    } catch (error) {
        next(createError(error.status || 500, error.message))
    }
}