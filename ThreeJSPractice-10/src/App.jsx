import { MeshPortalMaterial, useTexture } from '@react-three/drei'
import React from 'react'
import { DoubleSide } from 'three'

const App = () => {
  const texture = useTexture('/anime_art_style_a_water_based_pokemon_like_environ.jpg')
  return (
    <>
    <mesh>
      <planeGeometry args={[20.,20]}/>
      <mesh scale={[10,10,10]} >
        <sphereGeometry args={[2,32,32]}/>
        <meshStandardMaterial map={texture} side={DoubleSide}/>
      </mesh>
    </mesh>
    </>
  )
}

export default App
