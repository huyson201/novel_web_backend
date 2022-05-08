import express from "express";
import { create, get } from "~/controllers/categoryController";
const route = express.Router()

route.get('/', get)
route.post('/', create)

export default route