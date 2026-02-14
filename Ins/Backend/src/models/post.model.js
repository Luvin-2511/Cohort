const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:"",
    },
    imgUrl:{
        type:String, 
        required:[true,"Cant post without an image"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userigers',
        required:[true,"You cant create a post !"]
    }
})

const postModel = mongoose.model('post',postSchema)

module.exports = postModel