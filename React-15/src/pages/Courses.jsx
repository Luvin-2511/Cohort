import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div className='text-7xl flex flex-col items-center justify-center mt-70 font-bold'>
      <h1 className='name relative overflow-hidden cursor-pointer uppercase'>Courses page</h1>
      <div className='underline flex gap-10 mb-10 text-2xl'>
        <NavLink to='/courses/kodr'>KODR</NavLink>
        <NavLink to='/courses/codex'>CODEX</NavLink>
      </div>
    </div>
  )
}

export default Home
