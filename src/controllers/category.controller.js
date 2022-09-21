import createHttpError from "http-errors"
import prisma from "~/models"
import { responseFormat } from "~/utils"

export const getAll = async (req, res, next) => {
    try {
        let categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })
        return res.status(200).json(responseFormat(categories))
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}

export const getBooksByCate = async (req, res, next) => {
    return res.status(200).json(responseFormat(req.paginationResult))
}