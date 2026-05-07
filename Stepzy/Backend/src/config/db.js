import mongoose from 'mongoose'
import { CONFIG } from './config.js'

async function connectToDB(){
    await mongoose.connect(CONFIG.MONGO_URI)
    console.log('Mongo database connected successfully !');
}

export default connectToDB