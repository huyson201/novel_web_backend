import createHttpError from "http-errors"
import prisma from "~/models"
import { createChapterResponse, responseFormat } from "~/utils"

const getBooks = async (req, res, next) => {
    return res.status(200).json(responseFormat(req.paginationResult))
}
const getBookBySlug = async (req, res, next) => {
    try {
        let { slug } = req.params
        let book = await prisma.book.findUnique({
            where: { slug },
            include: {
                categories: true
            }
        })
        return res.status(200).json(responseFormat(book))
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}

const getRecommends = async (req, res, next) => {

    try {
        let books = await prisma.recommend.findMany({
            select: {
                book: {
                    include: {
                        categories: true
                    }
                }
            },
            orderBy: {
                updatedAt: 'desc'
            }

        })
        books = books.map(value => {
            return value.book
        })
        return res.status(200).json(responseFormat(books))
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}

const getPopularBooks = async (req, res, next) => {
    let { limit } = req.query
    if (!limit) limit = 10
    try {
        let books = await prisma.book.findMany({
            include: {
                categories: true
            },
            orderBy: {
                view: 'desc'
            },
            take: +limit
        })

        return res.status(200).json(responseFormat(books))
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}

const getFulledBooks = async (req, res, next) => {
    try {
        let books = await prisma.book.findMany({
            where: {
                state: 'full'
            },
            include: {
                categories: true
            },
            orderBy: {
                updatedAt: 'desc'
            },
            take: 6
        })
        return res.status(200).json(responseFormat(books))
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}

const getChapter = async (req, res, next) => {
    const { slug, chapterId } = req.params

    try {
        let chapter = await prisma.chapter.findFirst({ where: { id: +chapterId } })

        let dataRes = await createChapterResponse(chapter)

        return res.status(200).json(responseFormat(dataRes))
    } catch (error) {
        console.log(error)
        return next(createHttpError(500, error.message))
    }
}

const searchBook = async (req, res, next) => {
    const { q } = req.query
    if (!q) return res.status(200).json(responseFormat([]))

    try {
        let books = await prisma.book.findMany({
            where: {
                title: {
                    search: q
                }
            },
            select: {
                id: true,
                slug: true,
                categories: true,
                image: true,
                title: true
            }
        })
        return res.status(200).json(responseFormat(books))

    } catch (error) {
        console.log(error)
        return next(createHttpError(500, error.message))
    }
}


export default { getBooks, getBookBySlug, getRecommends, getPopularBooks, getFulledBooks, getChapter, searchBook }