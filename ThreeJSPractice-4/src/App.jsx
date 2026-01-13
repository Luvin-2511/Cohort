import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { PlaneGeometry } from "three"
import * as THREE from 'three'

const App = () => {
  
  const ballRef = useRef(null)
  const velocity = useRef({ x: 0.02, y: 0, z: 0.03 })
  useFrame(() => {
    ballRef.current.position.y += velocity.current.y;
    ballRef.current.position.x += velocity.current.x;
    ballRef.current.position.z += velocity.current.z;
    velocity.current.y -= 0.001
    if (ballRef.current.position.x >= 10 || ballRef.current.position.x <= -10) {
      velocity.current.x = -velocity.current.x
    }
    if (ballRef.current.position.z >= -5 || ballRef.current.position.z <= -15) {
      velocity.current.z = -velocity.current.z
    }
    if (ballRef.current.position.y <= 0.5) {
      velocity.current.y = -velocity.current.y * 0.95
    }
  })
  return (
    <>
      <ambientLight intensity={10} />
      <pointLight args={[10, 10, 10]} />
      <mesh ref={ballRef} position={[0, 7, -10]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={0x00FF00} />
      </mesh>
      <mesh position={[0, 0, -10]} rotation={[-Math.PI / 2, -0.005, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={0xFF0000} side={THREE.DoubleSide} />
      </mesh>
    </>

  )
}

export default App
