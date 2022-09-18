import createHttpError from "http-errors"
import prisma from "~/models"
const authMiddleware = async (req, res, next) => {
    let email = req.body.email
    if (!email) return next(createHttpError(404, 'Email empty!'))
    try {
        let user = await prisma.user.findUnique({ where: { email } })
        if (user) return next(createHttpError(409, 'Email exist!'))
        return next()
    } catch (error) {
        return next(createHttpError(500, error.message))
    }
}
export default authMiddleware