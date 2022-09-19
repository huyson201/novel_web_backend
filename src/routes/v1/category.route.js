const route = require('express').Router()
import { getAll } from '~/controllers/category.controller'
route.get('/', getAll)
export default route