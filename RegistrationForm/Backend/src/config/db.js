const mongoose = require('mongoose')

async function connectToDb(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connection Established !')
    }
    catch(err){
        console.log(err.message)
        process.exit(1)
    }
}

module.exports = connectToDb