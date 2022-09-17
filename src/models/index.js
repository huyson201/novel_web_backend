import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

prisma.$use(async (params, next) => {
    if (params.model == 'User' && params.action == 'create') {
        let password = params.args.data.password
        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        params.args.data.password = hashPassword
    }

    return next(params)
})
export default prisma