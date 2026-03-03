import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/api/posts',
    withCredentials: true
})

export const getFeed = async () => {
    try {
        const response = await api.get('/feed')
        return response.data
    } catch (err) {
        console.log(err)
    }
}
