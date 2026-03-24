import "dotenv/config";
import app from './src/app.js'
import connectToDb from './src/config/db.connection.js'
import http from 'http';
import { initSocket } from "./src/sockets/server.socket.js";

const httpServer = http.createServer(app)
initSocket(httpServer)
connectToDb()

httpServer.listen(process.env.PORT,()=>{
    console.log(`Server listening at PORT : ${process.env.PORT}`)
})