import mongoose from 'mongoose'
import { CONFIG } from './config'

export async function connectToDB() {
    try {
        await mongoose.connect(CONFIG.MONGO_URI)
        console.log('Connected to DB !')
    }catch(err){
        console.log(err)
    }
}
