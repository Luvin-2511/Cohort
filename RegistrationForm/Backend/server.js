const app = require('./src/app')
const PORT = 3000
const connectToDb = require('./src/config/db')

connectToDb()


app.listen(PORT,()=>{
    console.log(`Server listening at PORT : ${PORT}`)
})