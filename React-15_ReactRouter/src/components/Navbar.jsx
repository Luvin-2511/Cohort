import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='h-[5rem] flex items-center justify-between px-10'>
        <div className='uppercase text-blue-500 text-5xl font-bold'>
            <h2>Navbar</h2>
        </div>
        <div className='flex items-center justify-center gap-10 text-3xl'>
        <NavLink className={({isActive})=>{
            return isActive?'text-blue-600':'text-white'
        }}
         to='/'>Home</NavLink>
        <NavLink className={({isActive})=>{
            return isActive?'text-blue-600':'text-white'
        }}
         to='/about'>About</NavLink>
        <NavLink className={({isActive})=>{
            return isActive?'text-blue-600':'text-white'
        }}
         to='/contact'>Contact</NavLink>
        <NavLink className={({isActive})=>{
            return isActive?'text-blue-600':'text-white'
        }}
         to='/courses'>Courses</NavLink>
        </div>
    </div>
  )
}

export default Navbar
