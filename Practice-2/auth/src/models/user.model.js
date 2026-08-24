import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: [true, 'Google Id is required !'],
    unique: true
  },
  email: {
    type: String,
    trim: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  }
})

const userModel = mongoose.model('user', userSchema)

export default userModel
