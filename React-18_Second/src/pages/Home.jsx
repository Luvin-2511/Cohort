import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navi = useNavigate()
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center gap-6'>
        <h1 className='text-6xl font-bold'>This is Home page</h1>
        <button onClick={()=>{
            navi('/products')
        }} className='text-xl font-semibold px-4 py-2 rounded bg-emerald-600 cursor-pointer hover:bg-emerald-800 transition-all'>Explore Products</button>
    </div>
  )
}

export default Home
