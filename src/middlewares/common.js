import createHttpError from "http-errors"
import { bookPagination, chapterPagination, getBooksByCatePagination, searchChapterPagination } from "~/utils"

export const getAllsBookMiddleware = () => {
    return async (req, res, next) => {
        let { page, limit, order, sort } = req.query
        try {
            req.paginationResult = await bookPagination(page, limit, order, sort)
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
            req.paginationResult = await getBooksByCatePagination(cateSlug, page, per_page, order, sort)
            return next()
        } catch (error) {
            console.log(error)
            return next(createHttpError(500, error.message))
        }
    }
}


export const createValidateRequest = (validator, errorCode = 500) => {
    return async (req, res, next) => {
        try {
            await validator(req.body)
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