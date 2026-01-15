import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { SphereGeometry } from 'three'


const App = () => {
  const sphereGeo = useRef(null)
  const texture = useTexture('/SunTexture.png')
  const marsText = useTexture('/mars.jpg')
  const earText = useTexture('/ear.jpg')
  const venText = useTexture('/ven.jpg')
  const merText = useTexture('/mer.jpg')
  const satText = useTexture('/sat.jpg')
  const uraText = useTexture('/ura.jpg')
  const nepText = useTexture('/nep.jpg')
  const jupText = useTexture('/jup.jpg')

  useFrame(() => {
    sphereGeo.current.rotation.y += 0.005
  })
  return (
    <>
      <group>
        <mesh ref={sphereGeo}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial map={texture} emissive='red' emissiveIntensity={2} />
        </mesh>
        <mesh position={[0, 3, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial map={merText} />
        </mesh>
        <mesh position={[2, -2, 0]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial map={venText} />
        </mesh>
        <mesh position={[-2, -4, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial map={earText} />
        </mesh>
        <mesh position={[-2, 0, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial map={marsText} />
        </mesh>
        <mesh position={[4, 3, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial map={satText} />
        </mesh>
        <mesh position={[-4, 3, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial map={uraText} />
        </mesh>
        <mesh position={[5, 3, 1]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial map={nepText} />
        </mesh>
        <mesh position={[5, 3, 1]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial map={jupText} />
        </mesh>
      </group>
    </>
  )
}

export default App
