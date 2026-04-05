import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:3000',
    withCredentials:true
})

export async function saveItem(url) {
    try {
        const response = await api.post('/api/item/save-item', { url })
        return response.data
    } catch (err) {
        throw err
    }
}

export async function getItems() {
    try {
        const response = await api.get('/api/item/get-item')
        return response.data
    } catch (err) {
        throw err
    }
}

export async function searchItems(q) {
    try {
        const response = await api.get(`/api/item/search?q=${encodeURIComponent(q)}`)
        return response.data
    } catch (err) {
        throw err
    }
}

export async function getResurfacedItems() {
    try {
        const response = await api.get('/api/item/resurface')
        return response.data
    } catch (err) {
        throw err
    }
}

export async function getRelatedItems(itemId) {
    try {
        const response = await api.get(`/api/item/${itemId}/related`)
        return response.data
    } catch (err) {
        throw err
    }
}
