import axios from 'axios'

const api = axios.create({
    baseURL:`https://api.themoviedb.org/3`,
    withCredentials:true
})

export const getPopularMovies = async () => {
    try {
        const response = await api.get('/movies/popular',{
            params:{
                api_key:process.env.API_KEY
            }
        })
        return response.data
    }catch(err){
        console.log(err)
    }
}

