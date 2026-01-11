import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'

const App = () => {
  const [hover, sethover] = useState(false)
  const bottleRef = useRef(null)
  useFrame(()=>{
    if(bottleRef.current && !hover){
      bottleRef.current.rotation.z+=0.01
    }else{
      bottleRef.current.rotation.y+=0.01

    }
  })
  return (
      <group 
      ref={bottleRef}
      onPointerOver={()=>{sethover(true)}}
      onPointerOut={()=>{sethover(false)}}
      >
        <mesh position={[0,2.2,0]}>
          <cylinderGeometry args={[0.2,0.2,1,64,1,false]}/>
          <meshStandardMaterial color={0x87CEEB} side={THREE.DoubleSide}/>
        </mesh>
        <mesh position={[0,2,0]}>
          <cylinderGeometry args={[0.2,1,1,64,1,false]}/>
          <meshStandardMaterial color={0xFF0000} side={THREE.DoubleSide}/>
        </mesh>
        <mesh>
          <cylinderGeometry args={[1,1,3,64,1,false]}/>
          <meshStandardMaterial color={0xFF0000} side={THREE.DoubleSide}/>
        </mesh>
      </group>
  )
}

export default App
