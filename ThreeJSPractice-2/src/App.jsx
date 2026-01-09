import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

const App = () => {
  const tex = useTexture('/img.png')
  const meshref = useRef(null)
  useFrame(() => {
    if (meshref.current) {
      meshref.current.rotation.y += 0.002 
    }
  })


  return (
    <mesh ref={meshref} position={[0, -1, 0]} rotation={[0, 0, 0]}>
      <cylinderGeometry open args={[3, 1, 5, 50, 50, true]} />
      <meshStandardMaterial map={tex} side={THREE.DoubleSide} />
    </mesh>
  )
}

export default App
