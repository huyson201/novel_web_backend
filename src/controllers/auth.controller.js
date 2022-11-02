import prisma from '~/models'
import createHttpError from 'http-errors'
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken, responseFormat } from '~/utils'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

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

        let accessToken = generateAccessToken({ id: user.id, uid: user.uid, email: user.email })
        let refreshToken = generateRefreshToken({ id: user.id, uid: user.uid, email: user.email })

        res.cookie('auth.access_token', accessToken)
        res.cookie('auth.refresh_token', refreshToken)

        return res.status(200).json(responseFormat({ ...user, password: undefined }))
    } catch (error) {
        return next(createHttpError(500, error.message))
    }

}

const logout = async (req, res, next) => {
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
                updatedAt: "desc"
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
    const refresh_token = req.cookies['auth.refresh_token']
    try {
        let verify = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET)
        if (!verify) return next(createHttpError(401))
        let token = generateAccessToken({
            id: verify.id,
            email: verify.email,
            uid: verify.uid
        })
        res.cookie('auth.access_token', token)
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
                id: currentUser.id,
                uid: currentUser.uid
            },
            data: {
                name: username
            }
        })

        return res.status(200).json(
            responseFormat({ ...updatedUser, password: undefined })
        )
    } catch (error) {
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
    updateUsername
}