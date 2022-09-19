import { responseFormat } from "~/utils"

const createHttpError = require("http-errors")
const { default: prisma } = require("~/models")

const getAll = async (req, res, next) => {
    try {
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
        return res.status(200).json(responseFormat(sliders))
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}

export { getAll }