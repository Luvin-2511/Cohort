const mongoose = require('mongoose')

function connectToDB(){
    mongoose.connect('')
    .then(()=>{
        console.log('Connected to database');
    })
}

module.exports = connectToDB