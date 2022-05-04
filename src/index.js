import express from 'express'
import http from 'http'
import serverConfig from '~/configs/server'
import route from '~/routes'
import DBConnection from '~/configs/DBConnect'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 3002

serverConfig(app)
route(app)

const server = http.createServer(app)

server.listen(PORT, async () => {
    try {
        await DBConnection()
        console.log("Database connected!")
    } catch (error) {
        console.log(error.message)
    }
    console.log('server is running on port ' + PORT)
})