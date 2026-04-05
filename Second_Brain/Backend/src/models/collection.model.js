import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
    },
    name:{
        type:String,
        required:true,
    }
},{
    timestamps:true,
})

const collectionModel  = mongoose.model("collection", collectionSchema)

export default collectionModel