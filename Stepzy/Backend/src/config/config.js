import dotenv from 'dotenv'
dotenv.config()

export const CONFIG = {
    MONGO_URI:process.env.MONGO_URI
}