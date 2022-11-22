import redisClient from "~/databases/int.redis"
import { parseDataFromString, responseFormat } from "~/utils"

const createHttpError = require("http-errors")
const { default: prisma } = require("~/models")

const getAll = async (req, res, next) => {
    try {
        let cache = await redisClient.get("sliders")
        cache = parseDataFromString(cache)
        if (cache) return res.status(200).json(responseFormat(cache))


        let sliders = await prisma.slider.findMany({
            include: {
                book: {
                    select: { slug: true }
                }
            },
            orderBy: {
                updatedAt: 'desc'
            }
        })

        redisClient.set("sliders", JSON.stringify(sliders), 'EX', 60 * 5)

        return res.status(200).json(responseFormat(sliders))
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}

export { getAll }