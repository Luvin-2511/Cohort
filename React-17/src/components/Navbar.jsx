import React, { useContext } from 'react'
import { webContext } from '../context/WebsiteContext'

const Navbar = () => {
    const {title} = useContext(webContext)
  return (
    <div className='h-[7rem] bg-gray-900 flex px-10 py-2 flex items-center justify-between'>
      <div className='uppercase text-5xl font-bold'>{title}</div>
      <div className='flex text-2xl font-semibold gap-10 items-center justify-center'>
        <h1 className='cursor-pointer'>Home</h1>
        <h1 className='cursor-pointer'>About</h1>
        <h1 className='cursor-pointer'>Contact</h1>
        <h1 className='cursor-pointer'>Project</h1>
      </div>
    </div>
  )
}

export default Navbar
