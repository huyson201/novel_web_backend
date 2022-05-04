import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

async function DBConnection() {
    return mongoose.connect(process.env.DB_URL)
}

export default DBConnection