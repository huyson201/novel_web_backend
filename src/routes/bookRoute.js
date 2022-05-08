import express from "express";
import { getAll, getBySlug, getCates, getChapter, getChapters, update } from "~/controllers/bookController";
const route = express.Router()

route.get('/', getAll)
route.get('/:slug', getBySlug)
route.put('/:slug', update)
route.get('/:slug/categories', getCates)
route.get('/:slug/chapters', getChapters)
route.get('/:slug/chapters/:number(\\d+)', getChapter)

export default route