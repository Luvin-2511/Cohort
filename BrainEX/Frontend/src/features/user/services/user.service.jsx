import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:3000',
    withCredentials:true,
})

export async function getRename(name){
    try {
        const response = await api.patch('/api/user/rename',{
            name:name
        })
        return response.data
    }catch(err){
        throw err
    }
}

export async function getNewTitle(chatId,title){
    try {
        const response = await api.patch(`/api/chat/${chatId}/updateTitle`,{
            title:title
        })
        return response.data
    }catch(err){
        throw err
    }
}