import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate()
    
  return (
    <div className='h-[5rem] flex items-center justify-between px-10 absolute bottom-0 w-full bg-black'>
      <div className='text-5xl font-bold'>
        <h1>Footer</h1>
      </div>
      <button onClick={()=>{
        navigate('/courses')
      }} className='p-4 bg-emerald-300 rounded-md font-medium cursor-pointer text-black'>Explore Courses</button>
    </div>
  )
}

export default Footer
