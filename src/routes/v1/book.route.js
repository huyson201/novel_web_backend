const route = require('express').Router()
import bookController from '~/controllers/book.controller'
import { getByBookId } from '~/controllers/chapter.controller'
import { getAllsBookMiddleware, getChapterMiddleware, getSearchChapterMiddleware } from '~/middlewares/common'

route.get('/', getAllsBookMiddleware(), bookController.getBooks)
route.get('/recommends', bookController.getRecommends)
route.get('/popular', bookController.getPopularBooks)
route.get('/full', bookController.getFulledBooks)
route.get('/search', bookController.searchBook)
route.get('/:bookId/chapters', getChapterMiddleware(), getByBookId)
route.get('/:bookId/chapters/search', getSearchChapterMiddleware(), getByBookId)
route.get('/slug/:slug', bookController.getBookBySlug)
route.get('/slug/:slug/chapter/:chapterId', bookController.getChapter)
export default route
