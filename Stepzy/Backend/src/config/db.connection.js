import mongoose from 'mongoose'
import { CONFIG } from './config.js'

export async function connectToDB() {
    try {
        await mongoose.connect(CONFIG.MONGO_URI)
        console.log('Connected to DB !')
    }catch(err){
        console.log(err)
    }
}
