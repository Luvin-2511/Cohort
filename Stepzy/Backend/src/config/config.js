import dotenv from 'dotenv'
dotenv.config()

if(!process.env.MONGO_URI) {
    throw new Error("Mongo Uri is not present !")
}

export const CONFIG = {
    MONGO_URI:process.env.MONGO_URI
}