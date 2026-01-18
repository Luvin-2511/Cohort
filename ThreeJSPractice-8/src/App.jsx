import { useRef } from 'react'
import {useFrame} from '@react-three/fiber'

const App = () => {
  const boxRef = useRef(null)
  useFrame(()=>{
    boxRef.current.rotation.x += 0.01
    boxRef.current.rotation.y += 0.01
  })
  return (
    <>
      <mesh ref={boxRef}>
        <boxGeometry args={[1,1,1]}/>
        <meshStandardMaterial color='red'/>
      </mesh>
    </>
  )
}

export default App
