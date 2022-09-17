import prisma from '~/models'
import createHttpError from 'http-errors'

const getCategories = async (req, res, next) => {
    try {
        let categories = await prisma.category.findMany()
        // await prisma.book.create({
        //     data: {
        //         title: "demo",
        //         slug: "demo",
        //         categories: {
        //             connect: [{
        //                 id: 1
        //             }, { id: 2 }]
        //         }
        //     }
        // })
        return res.status(200).json({
            message: 'get success',
            status: 200,
            data: categories
        })
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}

export default { getCategories }