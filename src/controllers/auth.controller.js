import prisma from '~/models'
import createHttpError from 'http-errors'
import bcrypt from 'bcrypt'
import { createToken, responseFormat } from '~/utils'
import jwt from 'jsonwebtoken'
import redisClient from '~/databases/int.redis'
import { randomInt } from '~/utils';

import 'dotenv/config'

const getProfile = (req, res) => {
    return res.status(200).json(responseFormat({ ...req.user, password: undefined }))
}

const register = async (req, res, next) => {
    const data = req.body
    try {
        let user = await prisma.user.create({
            data: data
        })
        return res.status(200).json(responseFormat({ ...user, password: undefined }))
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


        let { access_token, refresh_token } = createToken({ id: user.id, uid: user.uid, email: user.email })

        let savedAge = process.env.SAVED_TOKEN_TIME || 1000 * 60 * 60 * 24 * 365 * 20
        res.cookie('auth.access_token', access_token, { httpOnly: true, maxAge: savedAge })
        res.cookie('auth.refresh_token', refresh_token, { httpOnly: true, maxAge: savedAge })

        // add refresh token to redis
        redisClient.set(`user::${user.id}-${user.uid}`, refresh_token, "EX", savedAge / 1000)
        return res.status(200).json(responseFormat({ ...user, password: undefined }))
    } catch (error) {
        return next(createHttpError(500, error.message))
    }

}

const logout = async (req, res, next) => {
    redisClient.del(`user::${req.user.id}-${req.user.uid}`)
    res.clearCookie('auth.access_token')
    res.clearCookie('auth.refresh_token')
    return res.status(200).json(responseFormat(null))
}

const getBookcase = async (req, res, next) => {
    let user = req.user
    try {
        let bookcase = await prisma.bookCase.findMany({
            where: {
                userId: user.id
            },
            select: {
                book: {
                    select: {
                        id: true,
                        image: true,
                        title: true,
                        slug: true
                    }
                },
                chapter: {
                    select: {
                        id: true,
                        title: true,
                        chapterNumber: true
                    }
                }
            },
            orderBy: {
                updatedAt: "desc",
            }
        })

        return res.status(200).json(responseFormat(bookcase))
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}


const deleteBookcaseById = async (req, res, next) => {
    let user = req.user
    let { book_id } = req.query
    try {
        let data = await prisma.bookCase.delete({
            where: {
                userId_bookId: { userId: user.id, bookId: +book_id }
            }
        })
        return res.status(200).json(responseFormat(data))
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}

const addBookcase = async (req, res, next) => {
    try {
        const user = req.user
        const { book_id, chapter_id } = req.body
        let bookcase = await prisma.bookCase.upsert({
            where: {
                userId_bookId: { userId: user.id, bookId: +book_id }
            },
            update: {
                chapterId: +chapter_id
            },
            create: {
                userId: user.id,
                bookId: +book_id,
                chapterId: +chapter_id
            }
        })
        return res.status(200).json(responseFormat(bookcase))
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}

const getBookcaseById = async (req, res, next) => {
    try {
        const user = req.user
        const { book_id } = req.params
        let bookcase = await prisma.bookCase.findFirst({
            where: {
                userId: user.id,
                bookId: +book_id
            }
        })

        return res.status(200).json(responseFormat(bookcase))
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}

const refreshToken = async (req, res, next) => {
    const refreshToken = req.cookies['auth.refresh_token']

    try {
        let verify = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        if (!verify) return next(createHttpError(401))

        let savedToken = await redisClient.get(`user::${verify.id}-${verify.uid}`)


        if (!savedToken || savedToken != refreshToken) return next(createHttpError(401, "user do not login"))

        let { access_token, refresh_token } = createToken({
            id: verify.id,
            email: verify.email,
            uid: verify.uid
        })

        redisClient.set(`user::${verify.id}-${verify.uid}`, refresh_token, "EX", process.env.SAVED_TOKEN_TIME || 365 * 24 * 60 * 60)
        res.cookie('auth.access_token', access_token)
        res.cookie('auth.refresh_token', refresh_token)
        return res.status(200).json({ message: 'success' })

    } catch (error) {
        console.log(error)
        return next(createHttpError(500, error.message))
    }
}

const updateUsername = async (req, res, next) => {
    const currentUser = req.user
    const { username } = req.body

    if (!username || username === '') return next(createHttpError(404, 'Username not found!'))
    try {
        let updatedUser = await prisma.user.update({
            where: {
                uid: currentUser.uid
            },
            data: {
                name: username
            }
        })
        redisClient.set(`profile::${updatedUser.id}-${updatedUser.uid}`, JSON.stringify(updatedUser), 'EX', 60 * 5 + randomInt(1, 10) * 10)
        return res.status(200).json(
            responseFormat({ ...updatedUser, password: undefined })
        )
    } catch (error) {
        console.log(error)
        return next(createHttpError(500, error.message))
    }
}


const changePasswd = async (req, res, next) => {
    const user = req.user
    const { oldPassword, newPassword, confirmPassword } = req.body
    if (newPassword !== confirmPassword) return next(createHttpError(401, "Confirm password not match!"))

    try {
        let checkPassword = bcrypt.compare(oldPassword, user.password)
        if (!checkPassword) return next(createHttpError(401, "Password invalid"))

        let hashNewPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10))

        let updatedUser = await prisma.user.update({
            where: {
                uid: user.uid
            },
            data: {
                password: hashNewPassword
            }
        })

        redisClient.set(`profile::${updatedUser.id}-${updatedUser.uid}`, JSON.stringify(updatedUser), 'EX', 60 * 5 + randomInt(1, 10) * 10)

        return res.status(200).json(responseFormat({}, 200, "updated"))
    } catch (error) {
        console.log(error)
        return next(createHttpError(500, error.message))
    }

}

export default {
    register,
    login,
    logout,
    getBookcase,
    deleteBookcaseById,
    addBookcase,
    getBookcaseById,
    refreshToken,
    updateUsername,
    changePasswd,
    getProfile
}