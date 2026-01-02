import axios from 'axios'
import { useEffect, useState } from 'react'
import pikachu from './assets/pika.webp'
import pokeball from './assets/pokeball.png'

const App = () => {
  const [pokemon, setpokemon] = useState([])
  const [loading, setloading] = useState(true)
  const [offset, setoffset] = useState(0)
  
  let limit = 100
  const caller = async () => {
    setpokemon([])
    setloading(true)
    let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
    let pokerdata = response.data.results
    for (const elem of pokerdata) {
      let secresponse = await axios.get(elem.url)
      setpokemon(prev => [...prev, secresponse.data])
    }
    setloading(false)
    console.log(pokemon);

  }

  useEffect(() => {
    caller()
  }, [offset])


  return (
    <>
      <div style={{ backgroundImage: `url(https://wallpapercave.com/wp/wp3831722.jpg)`, backgroundSize: 'cover', backgroundPosition: "center" }} className='h-screen w-full fixed inset-0 overflow-hidden'>
      </div>
      <div className='min-h-full w-full absolute p-8 bg-[rgb(0,0,0,0.7)]'>
        <div className='flex justify-center '>
          <img className='h-20 mr-5' src="https://imgs.search.brave.com/o5DTPPt3efrTAsaQRuYZr5xF_1wVkaYjoMCSjz3FXHA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvMjIvUHN5/ZHVjay1Qb2tlbW9u/LVBORy1QaG90b3Mu/cG5n" alt="" />
          <h1 className='text-5xl mt-4 text-center text-yellow-300'>Pokemon</h1>
          <img className='h-24 ' src={pikachu} alt="" />
        </div>
        {
          loading == false ?
            <div>
              <div className='min-h-full w-full flex-wrap p-4 mt-8 flex gap-10'>
                {pokemon.map((elem, idx) => {
                  return <div style={{ boxShadow: `0px 0px 5px 1px var(--${elem.types[0].type.name})` }} key={idx} className='h-[42rem] w-[25rem] md:w-[25rem] p-4 shrink-0 lg:w-[23.1%]  rounded-2xl bg-[rgba(255,255,255,0.05)] backdrop-blur-[1px]'>
                    <div className='h-[2rem] p-2 w-full flex items-center justify-between' >
                      <div className='flex items-center justify-center gap-2'>
                        <div style={{ backgroundColor: `color-mix(in srgb,var(--${elem.types[0].type.name}) 40%,transparent)` }} className='h-2 w-2 rounded-full'></div>
                        <div style={{ backgroundColor: `color-mix(in srgb,var(--${elem.types[0].type.name}) 100%,transparent)` }} className='h-2 w-2 rounded-full'></div>
                        <div style={{ backgroundColor: `color-mix(in srgb,var(--${elem.types[0].type.name}) 60%,transparent)` }} className='h-2 w-2 rounded-full'></div>
                      </div>
                      <div className='flex items-center gap-2 px-4 py-1 rounded-3xl'>
                        <div className='dil'><svg className=' mt-1' xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="red" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path></svg></div>
                        <h4 className='text-white hp font-bold text-2xl'>{elem.stats[0].base_stat}</h4>
                      </div>
                    </div>
                    <div style={{ backgroundColor: `color-mix(in srgb, var(--${elem.types[0].type.name}) 20%, transparent)` }} className='dabba cursor-pointer p-4 h-[34%] mt-2 flex items-center justify-center rounded-2xl w-full'>
                      <img className='h-[15rem] transition-all' src={elem.sprites.other.dream_world.front_default} alt="" />
                      <img className='h-[10rem] absolute transition-all opacity-0' src={elem.sprites.other.showdown.front_default} alt="" />
                    </div>
                    <div className='flex items-center mt-1 justify-between'>
                      <h2 className='naam  text-3xl font-[500] text-white capitalize'>{elem.name}</h2>
                      <div className='w-full h-[3rem] flex items-center justify-end gap-2'>
                          {elem.types.map((e,idxe)=>{
                            return <div style={{backgroundColor:`var(--${e.type.name})`}} key={idxe} className='rounded-md px-2 py-1 text-black text-sm cursor-pointer'>
                              <h5 className='uppercase text-white'>{e.type.name}</h5>
                            </div>
                          })}
                      </div>
                    </div>

                    <div className='flex flex-col'>
                          <div className='flex flex-col'>
                              {elem.stats.map((st)=>{
                                return <div className='p-2 flex flex-col gap-1'>
                                <div className='flex items-center justify-between text-sm text-white'>
                                  <h3>{st.stat.name}</h3>
                                  <h3>{st.base_stat}</h3>
                                </div>
                                <div className='relative w-full h-[0.4rem] bg-gray-500 rounded-xl overflow-hidden'>
                                  <div style={{ backgroundColor: `color-mix(in srgb, var(--${elem.types[0].type.name}) 90%, transparent)`,width:`${st.base_stat}%` }} className='absolute h-[0.4rem] rounded-xl'></div>
                                </div>
                              </div>
                              })}
                          </div>
                    </div>

                    <div className='hp text-sm mt-4 text-gray-500 flex items-center justify-around font-medium gap-4'>
                      <h3 className='px-4 py-1 border-2 border-gray-600 text-white rounded-xl'>Weight:{elem.weight}</h3>
                      <h3 className='px-4 py-1 border-2 border-gray-600 text-white rounded-xl'>Height:{elem.height}</h3>
                      <h3 className='px-4 py-1 border-2 border-gray-600 text-white rounded-xl'>EXP:{elem.base_experience}</h3>
                    </div>
                  </div>
                })}
              </div>
              <div className='w-full flex items-center mt-8 justify-center gap-16'>
                <button onClick={() => {
                  setoffset(prev => Math.max(0, prev - limit))
                }} className='text-2xl px-4 py-2 font-light rounded-xl cursor-pointer hover:bg-red-800 transition-all bg-red-600 text-white'>Previous</button>
                <button onClick={() => {
                  setoffset(prev => prev + limit)
                }} className='text-2xl px-4 py-2 font-light rounded-xl cursor-pointer hover:bg-red-800 transition-all bg-red-600 text-white'>Next</button>
              </div>
            </div>
            :
            <div className='h-[70vh] w-full flex items-center justify-center'>
              <img className='pika absolute w-[5rem] transition-all duration-100  bottom-0' src="https://media.tenor.com/6XLsvhpU61wAAAAi/run-pikachu.gif" alt="" />
              <div className='h-[5rem] w-[5rem] flex  relative border-4 rounded-full border-white border-b-transparent transition-all animate-spin'>
              </div>
              <img className='absolute h-[4rem] w-[4rem] animate-pulse' src={pokeball} alt="" />
            </div>
        }
      </div>
    </>
  )
}

export default App
