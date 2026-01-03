import React from 'react'
import { Link } from 'react-router-dom'

const Courses = () => {
  return (
    <div className='text-center'>
      <h1 className=' font-bold uppercase'>Courses PAGE</h1>
      <div className='flex gap-16 underline items-center justify-center mt-10'>
        <Link className='text-5xl' to='/courses/coder'>CODER</Link>
        <Link className='text-5xl' to='/courses/codex'>CODEX</Link>
      </div>
    </div>
  )
}

export default Courses
