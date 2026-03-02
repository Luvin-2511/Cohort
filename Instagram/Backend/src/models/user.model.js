const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "User with this username already exists !"],
        required: [true, "Fill all the field correctly"]
    },
    email: {
        type: String,
        unique: [true, "User with this email already exists !"],
        required: [true, "Fill all the field correctly"]
    },
    password: {
        type: String,
        required: [true, "Fill all the field correctly"],
        select: false
    }
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel