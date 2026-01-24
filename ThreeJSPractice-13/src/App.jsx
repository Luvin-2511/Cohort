import { useGLTF } from '@react-three/drei'
import React, { Suspense } from 'react'

const Model = () => {
  const model = useGLTF('/ben_10_cannonbolt.glb')
  
  return (
    <primitive 
      object={model.scene} 
      position={[0, 0, 0]}
      scale={100}
    />
  )
}

const App = () => {
  return (
    <Suspense fallback={null}>
      <Model />
    </Suspense>
  )
}

export default App