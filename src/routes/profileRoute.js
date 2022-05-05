import express from "express";
import { get } from "~/controllers/profileController";
import passport from 'passport'
const route = express.Router()

route.get('/', passport.authenticate("jwt", { session: false }), get)


export default route