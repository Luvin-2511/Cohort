import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { DoubleSide } from 'three'
import * as THREE from 'three'
import Wall from './components/Wall'

const App = () => {
  const [keys, setkeys] = useState({ w: false, s: false, a: false, d: false, shift: false })
  const playerRef = useRef(null)
  const model = useGLTF('/Walking.glb')
  const model2 = useGLTF('/Standinganim.glb')
  const model3 = useGLTF('/Running.glb')
  const speed = keys.shift ? 0.03 : 0.01

  const walkAnim = useAnimations(model.animations, model.scene)
  useEffect(() => {
    if (walkAnim.actions) {
      const walkAction = Object.values(walkAnim.actions)[0]
      walkAction?.play()
    }
  }, [walkAnim])

  const standAnim = useAnimations(model2.animations, model2.scene)
  useEffect(() => {
    if (standAnim.actions) {
      const standAction = Object.values(standAnim.actions)[0]
      standAction?.play()
    }
  }, [standAnim])

  const runAnim = useAnimations(model3.animations, model3.scene)
  useEffect(() => {
    if (runAnim.actions) {
      const runAction = Object.values(runAnim.actions)[0]
      runAction?.play()
    }
  }, [runAnim])


  useEffect(() => {
    const handleDown = (e) => {
      if (e.key === 'w') {
        setkeys(prev => ({ ...prev, w: true }))
        playerRef.current.rotation.set(0, Math.PI, 0)
      }
      if (e.key === 's') {
        setkeys(prev => ({ ...prev, s: true }))
        playerRef.current.rotation.set(0, 0, 0)
      }
      if (e.key === 'a') {
        setkeys(prev => ({ ...prev, a: true }))
        playerRef.current.rotation.set(0, -Math.PI / 2, 0)
      }
      if (e.key === 'd') {
        setkeys(prev => ({ ...prev, d: true }))
        playerRef.current.rotation.set(0, Math.PI / 2, 0)
      }
      if (e.key === 'Shift') {
        setkeys(prev => ({ ...prev, shift: true }))
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
      if (e.key === 'Shift') {
        setkeys(prev => ({ ...prev, shift: false }))
      }
    }


    window.addEventListener('keydown', handleDown)
    window.addEventListener('keyup', handleUp)

    return () => {
      window.removeEventListener('keydown', handleDown)
      window.removeEventListener('keyup', handleUp)
    }
  }, [])

  const walking = keys.w || keys.s || keys.a || keys.d
  const running = keys.shift && walking

  useFrame(() => {
    if (keys.w == true) {
      playerRef.current.position.z -= speed
    }
    if (keys.s == true) {
      playerRef.current.position.z += speed
    }
    if (keys.a == true) {
      playerRef.current.position.x -= speed
    }
    if (keys.d == true) {
      playerRef.current.position.x += speed
    }
  })

  const walls = [
    { position: [0, 1.5, 0], rotation: [0, 0, 0], args: [0.1, 3, 5] },
    { position: [2.5, 1.5, -2.5], rotation: [0, Math.PI / 2, 0], args: [0.1, 3, 5] },
    { position: [-2.5, 1.5, -2.5], rotation: [0, Math.PI / 2, 0], args: [0.1, 3, 5] },
    { position: [-7, 1.5, -2.5], rotation: [0, Math.PI, 0], args: [0.1, 3, 5] },
    { position: [-3.5, 1.5, -5], rotation: [0, Math.PI / 2, 0], args: [0.1, 3, 10] },
    { position: [2.5, 1.5, -7.5], rotation: [0, Math.PI / 2, 0], args: [0.1, 3, 5] },
    { position: [-7.5, 1.5, 7.5], rotation: [0, Math.PI / 2, 0], args: [0.1, 3, 5] },
    { position: [-5, 1.5, 5], rotation: [0, Math.PI / 2, 0], args: [0.1, 3, 5] },
    { position: [-5.8, 1.5, 0], rotation: [0, Math.PI / 2, 0], args: [0.1, 3, 2.5] },
    { position: [-5, 1.5, 2.5], rotation: [0, Math.PI / 2, 0], args: [0.1, 3, 5] },
    { position: [5, 1.5, 2.5], rotation: [0, Math.PI / 2, 0], args: [0.1, 3, 5] },
    { position: [5, 1.5, 5], rotation: [0, Math.PI / 2, 0], args: [0.1, 3, 10] },
    { position: [2.5, 1.5, 7.5], rotation: [0, Math.PI / 2, 0], args: [0.1, 3, 5] },
    { position: [6.2, 1.5, 0], rotation: [0, Math.PI / 2, 0], args: [0.1, 3, 7.5] },
    { position: [7.5, 1.5, -5], rotation: [0, Math.PI, 0], args: [0.1, 3, 5] },
    { position: [2.5, 1.5, 1.2], rotation: [0, Math.PI, 0], args: [0.1, 3, 2.5] },
    { position: [0, 1.5, 6.2], rotation: [0, Math.PI, 0], args: [0.1, 3, 2.5] },
    { position: [7.5, 1.5, 8.8], rotation: [0, Math.PI, 0], args: [0.1, 3, 2.5] },
    { position: [-2.5, 1.5, 7.5], rotation: [0, Math.PI, 0], args: [0.1, 3, 5] },
    { position: [-2.5, 1.5, 0], rotation: [0, Math.PI, 0], args: [0.1, 3, 5] },
    { position: [-7.5, 1.5, 5], rotation: [0, Math.PI, 0], args: [0.1, 3, 2.5] },
    { position: [5, 1.5, -5], rotation: [0, Math.PI, 0], args: [0.1, 3, 5] },
    { position: [-3.5, 1.5, -5], rotation: [0, Math.PI / 2, 0], args: [0.1, 3, 13] },
    { position: [-6.2, 1.5, -7.5], rotation: [0, Math.PI / 2, 0], args: [0.1, 3, 7.5] },
    { position: [-7.5, 1.5, -7.5], rotation: [0, Math.PI , 0], args: [0.1, 3, 2.5] },
    { position: [7.5, 1.5, -7.5], rotation: [0, Math.PI/2 , 0], args: [0.1, 3, 2.5] },
    { position: [5.2, 1.5, -5], rotation: [0, Math.PI/2 , 0], args: [0.1, 3, 2.5] },
    { position: [7.5, 1.5, -2.5], rotation: [0, Math.PI/2 , 0], args: [0.1, 3, 2.5] },
    { position: [7.5, 1.5, -7.5], rotation: [0, Math.PI , 0], args: [0.1, 3, 5] },
  ]



  return (
    <>
      {/* Player */}
      <group ref={playerRef} >
        <primitive rotation={[0, 0, 0]} visible={walking && !running} object={model.scene} />
        <primitive rotation={[0, 0, 0]} visible={!walking} object={model2.scene} />
        <primitive rotation={[0, 0, 0]} visible={running} object={model3.scene} />
      </group>
      {/* Walls */}
      {walls.map((wall) => {
        return <Wall rotation={wall.rotation} position={wall.position} args={wall.args} />
      })}

      {/* Corners */}
      <group>
        <mesh position={[0, 1.5, -10]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.1, 3, 20]} />
          <meshStandardMaterial color='blue' />
        </mesh>
        <mesh position={[0, 1.5, 10]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.1, 3, 20]} />
          <meshStandardMaterial color='blue' />
        </mesh>
        <mesh position={[-10, 1.5, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.1, 3, 20]} />
          <meshStandardMaterial color='blue' />
        </mesh>
        <mesh position={[10, 1.5, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.1, 3, 20]} />
          <meshStandardMaterial color='blue' />
        </mesh>
      </group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color='gray' side={DoubleSide} />
      </mesh>
    </>
  )
}

export default App
