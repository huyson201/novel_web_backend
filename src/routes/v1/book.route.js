const route = require('express').Router()
import bookController from '~/controllers/book.controller'
import { paginationResult } from '~/middlewares/common'
import prisma from '~/models'

route.get('/', paginationResult(prisma.book, { include: { categories: true } }), bookController.getBooks)
route.get('/:slug', bookController.getBookBySlug)
export default route
