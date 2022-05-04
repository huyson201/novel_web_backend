import cors from 'cors'
import express from 'express'
import passport from 'passport'
import '~/configs/passport'

const handleError = (err, req, res, next) => {
    res.status(err.status || 500)
    return res.json({
        status: err.status,
        message: err.message
    })
}
const serverConfig = (app) => {
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(passport.initialize())
    app.use(handleError)
}

export default serverConfig