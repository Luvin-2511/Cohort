import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { DoubleSide } from 'three'

const App = () => {
  const [click, setClick] = useState(null)
  const [firework, setFirework] = useState([])

  const handleClick = (e) => {
    const newFirework = {
      id: Date.now(),
      position: [e.point.x, e.point.y, e.point.z],
      velocity:0.1
    }

    setFirework([...firework,newFirework])
  }

  useFrame(()=>{
    setFirework(prev=>prev.map((fw)=>({
      ...fw,
      position:[fw.position[0],fw.position[1]+fw.velocity,fw.position[2]]
    })))
  })


  return (
    <>
      <color attach="background" args={['#000510']} />
      {/* Sphere */}
      {firework.map((fw)=>{
        return <mesh key={fw.id} position={fw.position}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color='red' />
        </mesh>
      })
      }
      {/* BG */}
      <mesh onClick={(e) => {
        handleClick(e)
      }}
        visible={false}
        position={[0, 5, -5]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color='#000510' side={DoubleSide} />
      </mesh>
    </>
  )
}

export default App
