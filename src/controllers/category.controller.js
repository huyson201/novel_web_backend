import createHttpError from "http-errors"
import redisClient from "~/databases/int.redis"
import prisma from "~/models"
import { parseDataFromString, responseFormat, randomInt } from "~/utils"

export const getAll = async (req, res, next) => {
    try {
        // getDate from cache
        let cacheCates = await redisClient.get("categories")
        cacheCates = parseDataFromString(cacheCates)

        if (cacheCates) return res.status(200).json(responseFormat(cacheCates))

        let categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })

        redisClient.set("categories", JSON.stringify(categories), 'EX', 60 * 5 + randomInt(1, 10) * 10)

        return res.status(200).json(responseFormat(categories))

    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}

export const getBooksByCate = async (req, res, next) => {
    return res.status(200).json(responseFormat(req.paginationResult))
}