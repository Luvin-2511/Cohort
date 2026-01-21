import { useAnimations, useFBX, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { DoubleSide } from 'three'
import * as THREE from 'three'
import Wall from './components/Wall'
import { useThree } from '@react-three/fiber'

const App = () => {
  const [keys, setkeys] = useState({ w: false, s: false, a: false, d: false })
  const playerRef = useRef(null)
  const walking = keys.w || keys.s || keys.a || keys.d
  const speed = 0.02
  const boundryWall = useRef(null)
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
    { position: [-7.5, 1.5, -7.5], rotation: [0, Math.PI, 0], args: [0.1, 3, 2.5] },
    { position: [7.5, 1.5, -7.5], rotation: [0, Math.PI / 2, 0], args: [0.1, 3, 2.5] },
    { position: [5.2, 1.5, -5], rotation: [0, Math.PI / 2, 0], args: [0.1, 3, 2.5] },
    { position: [7.5, 1.5, -2.5], rotation: [0, Math.PI / 2, 0], args: [0.1, 3, 2.5] },
    { position: [7.5, 1.5, -7.5], rotation: [0, Math.PI, 0], args: [0.1, 3, 5] },
  ]

  const { camera } = useThree()


  const model = useGLTF('/Standing.glb')
  const model2 = useGLTF('/Walking.glb')
  const animation1 = useAnimations(model.animations, model.scene)
  const animation2 = useAnimations(model2.animations, model2.scene)


  useEffect(() => {
    if (!animation1.actions) return
    animation1.actions["Armature|mixamo.com|Layer0"].play()
  }, [animation1])
  useEffect(() => {
    if (!animation2.actions) return
    animation2.actions["Armature|mixamo.com|Layer0"].play()
  }, [animation2])


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
    const newPos = playerRef.current.position.clone()

    if (keys.w == true) newPos.z -= speed
    if (keys.s == true) newPos.z += speed
    if (keys.a == true) newPos.x -= speed
    if (keys.d == true) newPos.x += speed

    let canMove = true

    if (newPos.x < -9.5 || newPos.x > 9.5 || newPos.z < -9.5 || newPos.z > 9.5) {
      canMove = false
    }
    const playerSize = 0.5
    for (let wall of walls) {
      const [wx, , wz] = wall.position
      const [width, , depth] = wall.args
      const rotY = wall.rotation[1]

      const isVertical = Math.abs(Math.abs(rotY) - Math.PI / 2) < 0.001
      const wallWidth = isVertical ? depth : width
      const walldepth = isVertical ? width : depth
      const distX = Math.abs(newPos.x - wx)
      const distZ = Math.abs(newPos.z - wz)

      if (distX < (playerSize + wallWidth) / 2 && distZ < (playerSize + walldepth / 2)) {
        canMove = false
      }

      if (canMove) {
        playerRef.current.position.copy(newPos)
        camera.position.lerp(new THREE.Vector3(newPos.x, newPos.y + 5, newPos.z + 2), 0.1)
        camera.lookAt(newPos.x, newPos.y, newPos.z)
      }
    }
  })




  return (
    <>
      {/* Player */}
      <group ref={playerRef} rotation={[0, 0, 0]} position={[-9, 0, 9]}>
        <primitive visible={!walking} object={model.scene} />
        <primitive visible={walking} object={model2.scene} />
      </group>
      {/* Walls */}
      {walls.map((wall, idx) => {
        return <Wall key={idx} rotation={wall.rotation} position={wall.position} args={wall.args} />
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
