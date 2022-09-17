import createHttpError from "http-errors"
import { pagination } from "~/utils"
export const paginationResult = (model) => {
    return async (req, res, next) => {
        let { page, limit, order, ...query } = req.query


        if (!page) page = 1
        if (!limit) limit = 10
        if (!order) {
            order = { createdAt: 'desc' }
        }
        else {
            let splitArr = order.split(':')
            order = { [`${splitArr[0]}`]: splitArr[1] }
        }
        let options = {
            include: {
                categories: {
                    select: {
                        name: true, slug: true
                    }
                },
                chapters: {
                    orderBy: { chapterNumber: 'desc' },
                    take: 1,
                    select: {
                        id: true,
                        title: true,
                        chapterNumber: true,
                        createdAt: true,
                        updatedAt: true,
                        bookId: true
                    }
                }
            }
        }
        try {
            let paginationResult = await pagination(model, query, order, options, page, limit)
            req.paginationResult = paginationResult
            return next()
        } catch (error) {
            return next(createHttpError(500, error.message))
        }
    }
}