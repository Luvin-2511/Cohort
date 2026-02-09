const app = require('./src/app')
const PORT = 3000
require('dotenv').config()
const connectToDb = require('./config/connection')
connectToDb()


app.listen(PORT,()=>{
    console.log(`Server listening at PORT : ${PORT}`)
})