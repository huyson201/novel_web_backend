const route = require('express').Router()
import bookController from '~/controllers/book.controller'
import { getAllsBookMiddleware } from '~/middlewares/common'
import prisma from '~/models'

route.get('/', getAllsBookMiddleware(), bookController.getBooks)
route.get('/recommends', bookController.getRecommends)
route.get('/popular', bookController.getPopularBooks)
route.get('/slug/:slug', bookController.getBookBySlug)
export default route
