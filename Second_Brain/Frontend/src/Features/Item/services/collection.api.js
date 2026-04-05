import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    withCredentials:true
})
export async function createCollection(name) {
    try {
        const response = await api.post("/api/collection/create", { name });
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function getCollections() {
    try {
        const response = await api.get("/api/collection/get");
        return response.data;
    } catch (err) {
        throw err;
    }
}
