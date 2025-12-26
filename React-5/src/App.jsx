import React from 'react'
import Navbar from '../Components/Navbar'

const App = () => {
  return (
    <div className='h-[100vh] w-[100vw] bg-black'>
      <Navbar />
      <h1 className="text-white text-9xl text-center font-semibold uppercase bg-red-500">U can write code using CDN of Tailwind</h1>
      <h3 className="text-gray-100 text-2xl font-bold text-center">Like this text-white text-9xl text-center font-semibold uppercase bg-red-500</h3>
      <h3 className="text-gray-100 text-2xl font-bold text-center">text-gray-100 text-2xl font-bold text-center</h3>
      <h3 className="text-red-500 text-2xl font-bold text-center">Every CSS property can be used using tailwind which is easy</h3>
    </div>
  )
}

export default App
