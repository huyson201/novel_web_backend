const route = require('express').Router()
import { getAll, getBooksByCate } from '~/controllers/category.controller'
import { getBooksByCateMiddleware } from '~/middlewares/common'
route.get('/', getAll)
route.get('/:cateSlug/books', getBooksByCateMiddleware(), getBooksByCate)
export default route