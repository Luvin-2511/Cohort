import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    role:{
        type:String,
        enum:['ai','user'],
        required:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chat",
        required:true
    }
},{timestamps:true})


const messageModel = mongoose.model("message",messageSchema)
export default messageModel