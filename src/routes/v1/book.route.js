const route = require('express').Router()
import bookController from '~/controllers/book.controller'
import { getByBookId } from '~/controllers/chapter.controller'
import { getAllsBookMiddleware, getChapterMiddleware } from '~/middlewares/common'
import prisma from '~/models'

route.get('/', getAllsBookMiddleware(), bookController.getBooks)
route.get('/recommends', bookController.getRecommends)
route.get('/popular', bookController.getPopularBooks)
route.get('/full', bookController.getFulledBooks)
route.get('/:bookId/chapters', getChapterMiddleware(), getByBookId)
route.get('/slug/:slug', bookController.getBookBySlug)
export default route
