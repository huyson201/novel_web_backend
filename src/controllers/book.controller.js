import createHttpError from "http-errors"
import prisma from "~/models"

const getBooks = async (req, res, next) => {
    return res.status(200).json({ message: "get success", status: 200, data: req.paginationResult })
}
const getBookBySlug = async (req, res, next) => {
    try {
        let { slug } = req.params
        let book = await prisma.book.findUnique({
            where: { slug },
            include: {
                categories: {
                    select: { id: true, name: true, slug: true }
                }
            }
        })
        return res.status(200).json({
            status: 200,
            message: "get book success",
            data: book
        })
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}


export default { getBooks, getBookBySlug }