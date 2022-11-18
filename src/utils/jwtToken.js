import jwt from 'jsonwebtoken'
import 'dotenv/config'
export const generateAccessToken = (payload) => {
    let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' })
    return token
}

export const generateRefreshToken = (payload) => {
    let token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET)
    return token
}


export const createToken = (payload) => {
    const access_token = generateAccessToken(payload)
    const refresh_token = generateRefreshToken(payload)
    return {
        access_token,
        refresh_token
    }
}