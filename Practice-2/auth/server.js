import app from './src/app.js'
import connectToDB from './src/config/db.js'

const port = process.env.PORT || 3000
connectToDB()

app.listen(port, () => {
  console.log(`Server listening at PORT : ${port}`)
})
