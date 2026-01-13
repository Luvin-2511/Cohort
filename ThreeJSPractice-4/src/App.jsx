import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { PlaneGeometry } from "three"
import * as THREE from 'three'

const App = () => {
  const ballRef = useRef(null)
  const velocity = useRef({x:0.02,y:0,z:0.03})
  useFrame(()=>{
    
  })
  return (
    <>
      <ambientLight intensity={10} />
      <pointLight args={[10, 10, 10]} />
      <mesh ref={ballRef} position={[-5, 10, -10]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={0x00FF00} />
      </mesh>
      <mesh position={[-5,0,-10]} rotation={[-Math.PI/2,-0.005,0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={0xFF0000} side={THREE.DoubleSide}/>
      </mesh>
    </>

  )
}

export default App
