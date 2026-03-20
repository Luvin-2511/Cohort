const app = require('./src/app')
const PORT = 3000
const connectToDb = require('./src/config/db.connection')
const generateInterviewReport = require('./src/services/ai.service')
const {resume,jobDescription,selfDescription} = require('./src/temp')


connectToDb()
// generateInterviewReport({resume,jobDescription,selfDescription})

app.listen(PORT, () => {
    console.log('Server listening at PORT : ', PORT)
})