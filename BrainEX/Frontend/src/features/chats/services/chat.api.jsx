import {io} from 'socket.io-client'

export function initializeSocket(){
   const socket = io("http://localhost:3000",{
        withCredentials:true
    })

    socket.on("connection",()=>{
        console.log("Connection Established !")
    })
}