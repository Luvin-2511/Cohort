import "dotenv/config"
import app from './src/app.js'
import { connectToDB } from "./src/config/db.connection.js"

connectToDB()

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Server connected to PORT :${port}`)
})