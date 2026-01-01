import axios from 'axios'
import React, { useEffect, useState } from 'react'
import pokeball from './assets/pokeball.png'

const App = () => {
  const [pokemon, setpokemon] = useState([])
  const [loading, setloading] = useState(true)
  let limit = 40
  const caller = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=40&limit=${limit}`)
    const temp = []
    for (const pok of response.data.results) {
      const detail = await axios.get(pok.url)
      temp.push(detail.data)
      setpokemon([...temp])
    }
    setloading(false)
  }
  useEffect(() => {
    caller()
  }, [])


  return (
    <div className='min-h-screen bg-black text-white'>
      {loading ? (
        <div className='h-screen flex flex-col items-center justify-center'>
          <img className='absolute animate-pulse h-20 w-20 ' src={pokeball} alt="Pokeball" />
          <div className='h-[6rem] w-[6rem] border-4 animate-spin border-b-transparent rounded-full'>

          </div>
        </div>
      ) : (
        <>
          <h1 className='font-poker2 text-7xl p-4 bg-black text-yellow-300 text-center pt-8'>
            Pokemon
          </h1>
          {pokemon.length > 0 &&
            (<div className='min-h-full w-full flex flex-wrap items-center justify-center bg-black border-white rounded-xl mt-[20px]'>
              {pokemon.map((elem,idx) => {
                console.log(elem)
                return <div key={idx} className='w-[24rem] m-4.5 gap-5 border-2 rounded-2xl items-center shrink-0 flex flex-col'>
                  <h1 className='text-3xl'>{elem.species.name}</h1>
                  <img className='h-30 w-30 bg-red-500' src={elem.sprites.other.showdown.front_default} alt="" />
                </div>
              })}
            </div>)}
        </>
      )}
    </div>
  )
}

export default App
