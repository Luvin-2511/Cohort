import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
})

export const getFeed = async () => {
    try {
        const response = await api.get('/posts/feed')
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const createPost = async (file, caption) => {
    try {
        const formData = new FormData()
        formData.append("post", file)
        formData.append("caption", caption)
        const response = await api.post('/posts/', formData)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const likePost = async (postId) => {
    try {
        const response = await api.post('/posts/like/' + postId)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const unLikePost = async (postId) => {
    try {
        const response = await api.post('/posts/unlike/' + postId)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const deletePost = async (postId) => {
    try {
        const response = await api.delete('/posts/' + postId)
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const getPost = async () => {
    try {
        const response = await api.get('/posts/')
        return response.data
    }catch (err){
        console.log(err)
    }
}

export const updateProfile = async (file,bio) => {
    try {
        const formdata = new FormData()
        formdata.append("profile",file)
        formdata.append("bio",bio)
        const response = await api.patch('/user/update-me',formdata)
        return response.data
    }catch (err){
        console.log(err)
    }
}