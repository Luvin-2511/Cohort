import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})

export async function Login(username, password) {
    try {
        const response = await api.post('/login', {
            username,
            password
        })
        return response.data

    } catch (err) {
        console.log(err)
    }
}

export async function Register(username, email, password) {
    try {
        const response = await api.post('/register', {
            username,
            email,
            password
        })
        return response.data

    } catch (err) {
        console.log(err)
    }
}

export const Logout = async () => {
    try {
        const response = await api.post('/logout')
        console.log(response.data)
    } catch (err) {
        console.log(err)
    }
}

export const Getme = async () => {
    try {
        const response = await api.get('/get-me')
        return response.data
    }catch (err){
        console.log(err)
    }
}