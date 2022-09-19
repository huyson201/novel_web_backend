import createHttpError from "http-errors"
import { bookPagination, chapterPagination } from "~/utils"

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
        let { page, limit, order, sort } = req.query
        try {
            req.paginationResult = await chapterPagination(+bookId, page, limit, order, sort)
            return next()
        } catch (error) {
            return next(createHttpError(500, error.message))
        }
    }
}