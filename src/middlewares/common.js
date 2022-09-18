import createHttpError from "http-errors"
import { bookPagination } from "~/utils"

export const getAllsBookMiddleware = (model) => {
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