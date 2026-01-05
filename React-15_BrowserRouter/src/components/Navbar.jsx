import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='h-[5rem] flex items-center justify-between px-10'>
        <div className='uppercase text-blue-500 text-5xl font-bold'>
            <h2>Navbar</h2>
        </div>
        <div className='flex items-center justify-center gap-10 text-3xl'>
        <Link className={({isActive})=>{
            return isActive?'text-blue-600':'text-white'
        }}
         to='/'>Home</Link>
        <Link className={({isActive})=>{
            return isActive?'text-blue-600':'text-white'
        }}
         to='/about'>About</Link>
        <Link className={({isActive})=>{
            return isActive?'text-blue-600':'text-white'
        }}
         to='/contact'>Contact</Link>
        <Link className={({isActive})=>{
            return isActive?'text-blue-600':'text-white'
        }}
         to='/courses'>Courses</Link>
        </div>
    </div>
  )
}

export default Navbar
