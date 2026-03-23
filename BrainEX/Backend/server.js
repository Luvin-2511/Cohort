import app from './src/app.js'
import connectToDb from './src/config/db.connection.js'

connectToDb()

app.listen(process.env.PORT,()=>{
    console.log(`Server listening at PORT : ${process.env.PORT}`)
})