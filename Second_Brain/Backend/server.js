import 'dotenv/config'
import app from './src/app.js'
import { connectToDB } from './src/config/db.connection.js';
import { generateEmbedding } from './src/services/ai.service.js';

const port = process.env.PORT || 3000
connectToDB()

app.listen(port,()=> {
    console.log(`Server listening at port :${port}`);
})