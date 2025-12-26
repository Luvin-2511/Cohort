import React from 'react'

const Navbar = () => {
  return (
    <div className='h-[7rem] w-[100vw] px-[4rem] bg-gray-500 text-white font-bold flex justify-between items-center'>
      <h3 className='text-3xl'>Navbar</h3>
      <ul className='flex items-center justify-center gap-[2rem]'>
        <li className='cursor-pointer hover:text-gray-200 transition-all'>Home</li>
        <li className='cursor-pointer hover:text-gray-200 transition-all'>About</li>
        <li className='cursor-pointer hover:text-gray-200 transition-all'>Contact</li>
        <li className='cursor-pointer hover:text-gray-200 transition-all'>Home</li>
        <li className='cursor-pointer hover:text-gray-200 transition-all'>About</li>
        <li className='cursor-pointer hover:text-gray-200 transition-all'>Contact</li>
      </ul>
    </div>
  )
}

export default Navbar
