import {Server} from 'socket.io'

let io;

export function initSocket(httpServer){
    io = new Server({
        cors:{
            origin:'http://localhost:5173',
            credentials:true
        }
    })

    console.log("Socket io Established !")

    io.on("connection",(socket)=>{
        console.log(`User connected :${socket.id}`)
    })
}

export function getIO(){
    if(!io){
       throw new Error('Error in establishing socket connection !')
    }
    return io
}