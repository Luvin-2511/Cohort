const mongoose = require('mongoose')

const postSchema  = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    url:{
        type:String,
        required:[true,"Enter a Post Url !"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"Unauthorized"]
    }
})

const postModel = mongoose.model('post',postSchema)

module.exports = postModel