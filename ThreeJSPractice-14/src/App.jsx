import { Environment, useGLTF, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'

const ThreeElement = ({ scale }) => {
  const model = useGLTF('/Miles.glb')
  return (
    <Canvas>
      <Environment preset="sunset" />
      <ambientLight intensity={10} position={[0, -2, 0]} />
      {/* <OrbitControls /> */}
      <primitive object={model.scene} position={[0, -4, 0]} scale={scale} />
    </Canvas>
  )
}

const App = () => {

  return (
    <>
      <main>
        <div className="abover">
          <nav>
            
          </nav>
          <ThreeElement scale={4} />
        </div>
      </main>
    </>
  )
}

export default App
