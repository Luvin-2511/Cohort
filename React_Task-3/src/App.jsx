import React from 'react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Secondpage from './Components/Secondpage'
import Thirdpage from './Components/Thirdpage'

const App = () => {
  return (
    <div className='overflow-x-hidden'>
      <Navbar />
      <Hero />
      <Secondpage />
      <Thirdpage />
    </div>
  )
}

export default App
