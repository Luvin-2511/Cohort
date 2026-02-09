const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,"User with email already exists !"]
    },
    password:String
})

const userModel = mongoose.model("userify",userSchema)

module.exports  =userModel