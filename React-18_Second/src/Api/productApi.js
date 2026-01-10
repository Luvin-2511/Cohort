import axios from 'axios'

export const getData = async () => {
    const response = await axios.get('https://fakestoreapi.com/products')
    return response.data
}

