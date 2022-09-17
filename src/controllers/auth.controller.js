import prisma from '~/models'
import createHttpError from 'http-errors'
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from '~/utils'

const register = async (req, res, next) => {
    const data = req.body
    try {
        let user = await prisma.user.create({
            data: data
        })
        return res.status(200).json({ message: "create success", status: 200, data: { ...user, password: undefined } })
    } catch (error) {
        next(createHttpError(500, error.message))
    }

}

const login = async (req, res, next) => {
    const { email, password } = req.body

    try {
        let user = await prisma.user.findUnique({ where: { email } })
        if (!user) return next(createHttpError(401, 'Email / Password invalid'))

        const compare = bcrypt.compareSync(password, user.password)
        if (!compare) return next(createHttpError(401, 'Email / Password invalid'))

        let accessToken = generateAccessToken({ id: user.id, uid: user.uid, email: user.email })
        let refreshToken = generateAccessToken({ id: user.id, uid: user.uid, email: user.email })

        res.cookie('auth.access_token', accessToken)
        res.cookie('auth.refresh_token', refreshToken)

        return res.status(200).json({ message: 'login success', status: 200, data: { ...user, password: undefined } })
    } catch (error) {
        return next(createHttpError(500, error.message))
    }

}

const logout = async (req, res, next) => {
    res.clearCookie('auth.access_token')
    res.clearCookie('auth.refresh_token')
    return res.status(200).json({
        message: "logout success",
        status: 200
    })
}
export default {
    register,
    login,
    logout
}