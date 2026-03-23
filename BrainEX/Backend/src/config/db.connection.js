import mongoose from 'mongoose'

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        console.log("Connected to DB !")
    })
    .catch((err) => {
        console.log("Error in connecting DB !"); 
    })
}

export default connectToDb