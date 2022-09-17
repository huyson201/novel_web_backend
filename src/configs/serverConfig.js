import createError from 'http-errors'
import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import passport from 'passport';
import './passport'
const serverConfig = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors({ origin: "http://localhost:3000", credentials: true }))
    app.use(morgan('dev'));
    app.use(cookieParser())
    app.use(passport.initialize())
}

module.exports = serverConfig