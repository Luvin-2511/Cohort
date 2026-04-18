import app from "./src/app.js";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connect", (socket) => {
  console.log("Connected User : "+socket.id);
  socket.emit('welcome',"Welcome h bhaiyo")
  socket.on("message",(msg)=>{
   
  })
});


httpServer.listen(3000, () => {
  console.log(`Server listening at port 3000`);
});
