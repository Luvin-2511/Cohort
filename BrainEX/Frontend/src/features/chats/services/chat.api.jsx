import {io} from 'socket.io-client'
import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:3000',
    withCredentials:true
})

export function initializeSocket(){
   const socket = io("http://localhost:3000",{
        withCredentials:true
    })

    socket.on("connect",()=>{
        console.log("Connection Established !")
    })
}

export async function fetchChats(){
    try {
        const response = await api.get('/api/chat/fetch-chats')
        return response.data
    }catch(err){
        console.log(err)
    }
}

export async function fetchMessageOfChat(chatId){
    try {
        const response = await api.get(`/api/chat/${chatId}/messages`)
        return response.data
    }catch(err){
        console.log(err)
    }
}

