import createError from 'http-errors'
import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import passport from 'passport';
import './passport'

const hostList = process.env.OPEN_COR_HOST ? process.env.OPEN_COR_HOST.split('|') : 'http://localhost:3000'


const serverConfig = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors({ origin: hostList, credentials: true }))
    app.use(morgan('dev'));
    app.use(cookieParser())
    app.use(passport.initialize())
}

module.exports = serverConfig