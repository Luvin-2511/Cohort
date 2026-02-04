const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Server connection Established !");
    })
}

module.exports = connectToDb