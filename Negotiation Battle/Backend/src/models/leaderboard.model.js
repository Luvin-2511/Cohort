import mongoose from 'mongoose'

const leaderboardSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"user"
    },
    productId:mongoose.Schema.Types.ObjectId,
    finalPrice:{
        type:Number,
    },
    roundsUsed:Number,
    rank:Number
})

leaderboardSchema.index({ user: 1, productId: 1 }, { unique: true })
leaderboardSchema.index({ productId: 1, finalPrice: 1 })

const leaderboardModel = mongoose.model("leaderboard", leaderboardSchema)

export default  leaderboardModel