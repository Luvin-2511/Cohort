import mongoose from 'mongoose'

async function connectToDB(){
   await mongoose.connect(process.env.MONGO_URI)
   console.log('Server connected successfully !')
}

export default connectToDB