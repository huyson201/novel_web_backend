import createHttpError from "http-errors"
import redisClient from "~/databases/int.redis"
import { bookPagination, chapterPagination, getBooksByCatePagination, parseDataFromString, searchChapterPagination } from "~/utils"

export const getAllsBookMiddleware = () => {
    return async (req, res, next) => {
        let { page, limit, order, sort } = req.query
        try {
            let cache = await redisClient.get(`allBooks::${page}`)
            cache = parseDataFromString(cache)
            if (cache) {
                req.paginationResult = cache
                return next()
            }

            req.paginationResult = await bookPagination(page, limit, order, sort)
            redisClient.set(`allBooks::${page}`, JSON.stringify(req.paginationResult), 'EX', 5 * 60)
            return next()
        } catch (error) {
            return next(createHttpError(500, error.message))
        }
    }
}

export const getChapterMiddleware = () => {
    return async (req, res, next) => {
        let { bookId } = req.params
        let { page, per_page, order, sort } = req.query

        try {
            req.paginationResult = await chapterPagination(+bookId, page, per_page, order, sort)
            return next()
        } catch (error) {
            return next(createHttpError(500, error.message))
        }
    }
}

export const getSearchChapterMiddleware = () => {
    return async (req, res, next) => {
        let { bookId } = req.params
        let { q, page, per_page, order } = req.query
        try {
            req.paginationResult = await searchChapterPagination(bookId, q, page, per_page, order)
            return next()
        } catch (error) {
            return next(createHttpError(500, error.message))
        }
    }
}


export const getBooksByCateMiddleware = () => {
    return async (req, res, next) => {
        const { cateSlug } = req.params
        let { page, per_page, order, sort } = req.query

        try {
            let cache = await redisClient.get(`cate::${cateSlug}::books::${page}`)

            cache = parseDataFromString(cache)

            if (cache) {
                req.paginationResult = cache
                return next()
            }

            req.paginationResult = await getBooksByCatePagination(cateSlug, page, per_page, order, sort)

            redisClient.set(`cate::${cateSlug}::books::${page}`, JSON.stringify(req.paginationResult), 'EX', 6 * 50)

            return next()
        } catch (error) {
            console.log(error)
            return next(createHttpError(500, error.message))
        }
    }
}


export const createValidateRequest = (validator, validateType = "body", errorCode = 500) => {
    return async (req, res, next) => {
        try {
            await validator(req[validateType])
            return next();
        } catch (errors) {
            // const createError = {}
            // errors.details.forEach(error => {
            //     createError[error.context.key] = error.message.replaceAll("\"", "")
            // })

            return next(createHttpError(errorCode, errors.details[0].message.replaceAll("\"", "")))
        }

    }
}