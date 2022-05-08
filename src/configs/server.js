import cors from 'cors'
import express from 'express'
import passport from 'passport'
import '~/configs/passport'


const serverConfig = (app) => {
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(passport.initialize())
}

export default serverConfig