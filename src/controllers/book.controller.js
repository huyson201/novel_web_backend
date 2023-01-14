import createHttpError from "http-errors"
import redisClient from "~/databases/int.redis"
import prisma from "~/models"
import { createChapterResponse, parseDataFromString, responseFormat } from "~/utils"

const getBooks = async (req, res) => {
    return res.status(200).json(responseFormat(req.paginationResult))
}
const getBookBySlug = async (req, res, next) => {
    try {
        let { slug } = req.params

        let cache = await redisClient.get(`book::${slug}`);
        cache = parseDataFromString(cache)
        if (cache) return res.status(200).json(responseFormat(cache))

        let book = await prisma.book.findUnique({
            where: { slug },
            include: {
                categories: true
            }
        })

        redisClient.set(`book::${slug}`, JSON.stringify(book), 'EX', 6 * 50)

        return res.status(200).json(responseFormat(book))
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}

const getRecommends = async (req, res, next) => {

    try {
        let cache = await redisClient.get("recommends");
        cache = parseDataFromString(cache)
        if (cache) return res.status(200).json(responseFormat(cache))

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

        redisClient.set("recommends", JSON.stringify(books), 'EX', 5 * 60)
        return res.status(200).json(responseFormat(books))
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}

const getPopularBooks = async (req, res, next) => {

    let { limit } = req.query
    if (!limit) limit = 10
    try {

        let cache = await redisClient.get(`popular::${limit}`);
        cache = parseDataFromString(cache)
        if (cache) return res.status(200).json(responseFormat(cache))

        let books = await prisma.book.findMany({
            include: {
                categories: true
            },
            orderBy: {
                view: 'desc'
            },
            take: +limit
        })

        redisClient.set(`popular::${limit}`, JSON.stringify(books), 'EX', 6 * 50)
        return res.status(200).json(responseFormat(books))

    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}

const getFulledBooks = async (req, res, next) => {
    try {
        let cache = await redisClient.get(`full-book`);
        cache = parseDataFromString(cache)
        if (cache) return res.status(200).json(responseFormat(cache))

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

        redisClient.set(`full-book`, JSON.stringify(books), 'EX', 6 * 50)

        return res.status(200).json(responseFormat(books))
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}

const getChapter = async (req, res, next) => {
    const { chapterId } = req.params

    try {
        let cache = await redisClient.get(`chapter::${chapterId}`);
        cache = parseDataFromString(cache)
        if (cache) return res.status(200).json(responseFormat(cache))


        let chapter = await prisma.chapter.findFirst({ where: { id: +chapterId } })

        let dataRes = await createChapterResponse(chapter)

        redisClient.set(`chapter::${chapterId}`, JSON.stringify(dataRes), 'EX', 6 * 50)

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

const incrementView = async (req, res, next) => {
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const bookId = req.params.bookId
    const key = `${userIp}-${bookId}::views`
    console.log(userIp)
    console.log(bookId);

    try {
        let isOk = await redisClient.set(key, 'viewed', 'NX', 'EX', 5 * 60)
        if (isOk) {
            console.log('increased view');

            await prisma.book.update({
                where: {
                    id: +bookId
                },
                data: {
                    view: { increment: 1 }
                }
            })
        }
        return res.status(200).json(responseFormat(null, 200, "updated"))
    } catch (error) {
        console.log(error)
        return next(createHttpError(500, error.message))
    }


}

export default { getBooks, getBookBySlug, getRecommends, getPopularBooks, getFulledBooks, getChapter, searchBook, incrementView }