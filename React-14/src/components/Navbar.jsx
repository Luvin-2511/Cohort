import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-10 mb-10'>
      <div>
        <h1 className='text-3xl font-bold'>React-Router-DOM</h1>
      </div>
      <div className='flex text-xl gap-10 font-semibold'>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
        <Link to='/project'>Project</Link>
        <Link to='/courses'>Courses</Link>
      </div>
    </div>
  )
}

export default Navbar
