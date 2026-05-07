import dotenv from 'dotenv'
dotenv.config()

if(!process.env.PORT) {
    throw new Error("Port is not defined in dotenv file")
}
if(!process.env.MONGO_URI) {
    throw new Error("Port is not defined in dotenv file")
}
if(!process.env.JWT_SECRET) {
    throw new Error("JWT SECRET is not defined in dotenv file")
}

export const CONFIG = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
}