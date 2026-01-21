import { useFrame } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import * as THREE from 'three'

const Pieces = ({ geometry, material, position }) => {
    const meshRef = useRef(null)
    const originalY = useRef(position[1])
    const [target, settarget] = useState(position[1])


    useFrame(() => {
        meshRef.current.position.y = THREE.MathUtils.lerp(
            meshRef.current.position.y,
            target,
            0.1
        )
        meshRef.current
    })

    return (
        <>
            <mesh
                ref={meshRef}
                position={position}
                material={material}
                geometry={geometry}
                onPointerOver={(e) => {
                    e.stopPropagation()
                    settarget(originalY.current + 0.2)
                }}
                onPointerOut={()=>{
                    settarget(originalY.current)
                }}
            />
        </>
    )
}

export default Pieces
