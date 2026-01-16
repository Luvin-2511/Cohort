import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { DoubleSide } from 'three'

const App = () => {
  const [keys, setkeys] = useState({ w: false, s: false, a: false, d: false })
  const playerRef = useRef(null)
  const model = useGLTF('/Walking.glb')
  const { actions } = useAnimations(model.animations)
  
  
  // useEffect(() => {
  //   if(actions){
  //     actions["Armature|mixamo.com|Layer0"].reset().play()
  //   }
  // }, [actions])

  useEffect(() => {
    const handleDown = (e) => {
      if (e.key === 'w') {
        setkeys(prev => ({ ...prev, w: true }))
      }
      if (e.key === 's') {
        setkeys(prev => ({ ...prev, s: true }))
      }
      if (e.key === 'a') {
        setkeys(prev => ({ ...prev, a: true }))
      }
      if (e.key === 'd') {
        setkeys(prev => ({ ...prev, d: true }))
      }
    }

    const handleUp = (e) => {
      if (e.key === 'w') {
        setkeys(prev => ({ ...prev, w: false }))
      }
      if (e.key === 'a') {
        setkeys(prev => ({ ...prev, a: false }))
      }
      if (e.key === 's') {
        setkeys(prev => ({ ...prev, s: false }))
      }
      if (e.key === 'd') {
        setkeys(prev => ({ ...prev, d: false }))
      }
    }

    window.addEventListener('keydown', handleDown)
    window.addEventListener('keyup', handleUp)

    return () => {
      window.removeEventListener('keydown', handleDown)
      window.removeEventListener('keyup', handleUp)
    }
  }, [])

  useFrame(() => {
    if (keys.w == true) {
      playerRef.current.position.z -= 0.05
    }
    if (keys.s == true) {
      playerRef.current.position.z += 0.05
    }
    if (keys.a == true) {
      playerRef.current.position.x -= 0.05
    }
    if (keys.d == true) {
      playerRef.current.position.x += 0.05
    }
  })

  return (
    <>
      <primitive rotation={[0, Math.PI, 0]} object={model.scene} ref={playerRef} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color='gray' side={DoubleSide} />
      </mesh>
    </>
  )
}

export default App
