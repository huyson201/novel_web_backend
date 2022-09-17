const route = require('express').Router()
import categoryControllers from '~/controllers/category.controller'
route.get('/', categoryControllers.getCategories)
export default route