import React from 'react'
import { Pokeball } from './components/Pokeball.jsx'
import { Broken } from './components/Broken.jsx'
import { AxesHelper } from 'three'

const App = () => {
  return (
    <>
    <ambientLight intensity={10}/>
      <Broken scale={[2, 2, 2]} />
    </>
  )
}

export default App
