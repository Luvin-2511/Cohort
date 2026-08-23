import mongoose from 'mongoose'

async function connectToDB () {
  try {
    await mongoose.connect(process.env.AUTH_MONGO_URI)
    console.log('Mongo DB connected successfully !')
  } catch (err) {
    console.log(`Error occured while trying to connect to mongoose : ${err}`)
    process.exit(1)
  }
}
export default connectToDB
