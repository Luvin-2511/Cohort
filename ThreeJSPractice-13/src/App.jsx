import { useGLTF } from '@react-three/drei'
import React from 'react'

const App = () => {
  const model = useGLTF('/ben_10_cannonbolt.glb')
  console.log(model.scene);

  return (
    <>
      <mesh>
        <primitive object={model.scene} />
        <meshStandardMaterial color='red' />
      </mesh>
    </>
  )
}

export default App
