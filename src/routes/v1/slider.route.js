const route = require('express').Router()
import { getAll } from '~/controllers/slider.controller'
route.get('/', getAll)
export default route