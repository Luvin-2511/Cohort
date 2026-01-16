import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { TorusGeometry } from 'three'
import Orbitline from './components/Orbitline'


const App = () => {
  // Refs For all planets
  const sphereGeo = useRef(null)
  const merRef = useRef(null)
  const merRotRef = useRef(null)
  const venRef = useRef(null)
  const venRotRef = useRef(null)
  const earthRef = useRef(null)
  const earthRotRef = useRef(null)
  const marRef = useRef(null)
  const marRotRef = useRef(null)
  const jupRef = useRef(null)
  const jupRotRef = useRef(null)
  const satRef = useRef(null)
  const satRotRef = useRef(null)
  const uraRef = useRef(null)
  const uraRotRef = useRef(null)
  const nepRef = useRef(null)
  const nepRotRef = useRef(null)
  const moonRef = useRef(null)

  // Textures for all Planets
  const texture = useTexture('/SunTexture.png')
  const marsText = useTexture('/mars.jpg')
  const moontexture = useTexture('/moon.jpg')
  const earText = useTexture('/ear.jpg')
  const venText = useTexture('/ven.jpg')
  const merText = useTexture('/mer.jpg')
  const satText = useTexture('/sat.jpg')
  const uraText = useTexture('/ura.jpg')
  const nepText = useTexture('/nep.jpg')
  const jupText = useTexture('/jup.jpg')

  // Animation for all planet
  useFrame(() => {
    sphereGeo.current.rotation.y += 0.00001
    merRef.current.rotation.y += 0.008
    merRotRef.current.rotation.y += 0.008
    venRef.current.rotation.y += 0.007
    venRotRef.current.rotation.y += 0.007
    earthRef.current.rotation.y += 0.006
    earthRotRef.current.rotation.y += 0.006
    marRef.current.rotation.y += 0.006
    marRotRef.current.rotation.y += 0.006
    jupRef.current.rotation.y += 0.005
    jupRotRef.current.rotation.y += 0.005
    satRef.current.rotation.y += 0.004
    satRotRef.current.rotation.y += 0.004
    uraRef.current.rotation.y += 0.003
    uraRotRef.current.rotation.y += 0.003
    nepRef.current.rotation.y += 0.002
    nepRotRef.current.rotation.y += 0.002
    moonRef.current.rotation.y += 0.01
  })

  return (
    <>
//Sun
      <mesh ref={sphereGeo}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={texture} emissive='red' />
      </mesh>
// Mercury - closest, smallest
      <group ref={merRef}>
        <mesh position={[2, 0, 0]} ref={merRotRef}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial map={merText} />
        </mesh>
      </group>
      <Orbitline radius={2}/>

// Venus
      <group ref={venRef}>
        <mesh position={[3, 0, 0]} ref={venRotRef}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial map={venText} />
        </mesh>
      </group>
      <Orbitline radius={3}/>

// Earth
      <group ref={earthRef}>
        <mesh position={[4.5, 0, 0]} ref={earthRotRef}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial map={earText} />
        </mesh>
        <group>
          <mesh position={[5, 0.5, 0]} ref={moonRef}>
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshStandardMaterial map={moontexture} />
          </mesh>
        </group>
      </group>
      <Orbitline radius={4.5}/>

// Mars
      <group ref={marRef}>
        <mesh position={[6, 0, 0]} ref={marRotRef}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial map={marsText} />
        </mesh>
      </group>
      <Orbitline radius={6}/>

// Jupiter - BIG!
      <group ref={jupRef}>
        <mesh position={[9, 0, 0]} ref={jupRotRef}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial map={jupText} />
        </mesh>
      </group>
      <Orbitline radius={9}/>

// Saturn
      <group ref={satRef}>
        <mesh position={[12, 0, 0]} ref={satRotRef}>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial map={satText} />
        </mesh>
          <mesh position={[12, 0, 0]} rotation={[1,0,0]}>
            <torusGeometry  args={[1.2, 0.3, 2, 100]} />
            <meshStandardMaterial map={satText} />
          </mesh>
      </group>
      <Orbitline radius={12}/>

// Uranus
      <group ref={uraRef}>
        <mesh position={[15, 0, 0]} ref={uraRotRef}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial map={uraText} />
        </mesh>
      </group>
      <Orbitline radius={15}/>

// Neptune
      <group ref={nepRef}>
        <mesh position={[18, 0, 0]} ref={nepRotRef}>
          <sphereGeometry args={[0.48, 32, 32]} />
          <meshStandardMaterial map={nepText} />
        </mesh>
      </group>
      <Orbitline radius={18}/>
    </>
  )
}

export default App
