const mongoose = require('mongoose')
const { CONFIG } = require('../config/config')

async function connectToDb(){
   await mongoose.connect(CONFIG.MONGO_URI)
   console.log("Server Connected Successfully !")
}

module.exports = connectToDb