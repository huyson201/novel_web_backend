import jwt from "jsonwebtoken";
import 'dotenv/config'

export const generateToken = (payload) => {
    let token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRED || '5m' })
    return token
}

export const generateRefreshToken = (payload) => {
    let token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY)
    return token
}