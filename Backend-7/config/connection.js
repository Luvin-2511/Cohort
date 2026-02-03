const mongoose = require('mongoose')

function connectToDB(){
    mongoose.connect('mongodb+srv://Luvin:Luvin2511@cohortcluster.fhvu2zn.mongodb.net/')
    .then(()=>{
        console.log('Connected to database');
    })
}

module.exports = connectToDB