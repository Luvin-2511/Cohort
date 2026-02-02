const express = require('express')
const app = express()
const mongoose = require('mongoose')


function connectToDB(){
    mongoose.connect('mongodb+srv://Luvin:Luvin2511@cohortcluster.fhvu2zn.mongodb.net/')
    .then(()=>{
        console.log('Connection set up successfully');
    })
}
    
connectToDB();
module.exports = app