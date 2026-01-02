import axios from 'axios'
import { useEffect } from 'react'

const App = () => {
  let limit = 20
  const caller = async () => {
    // let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=20&limit=${limit}`)
    let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/21/`)
    console.log(response.data);
  }

  useEffect(() => {
    caller()
  }, [])
  

  return (
    <div style={{backgroundImage:`url(https://wallpapercave.com/wp/wp3831722.jpg)`,backgroundSize:'cover',backgroundPosition:"center"}} className='h-screen w-full'>
      
    </div>
  )
}

export default App
