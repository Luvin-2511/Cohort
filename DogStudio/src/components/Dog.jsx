import React from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls ,useGLTF } from '@react-three/drei'

const Dog = () => {
    const scene = useGLTF('/model/dog.drc.glb')
    return (
        <>
            <primitive object={scene}/> 
            <directionalLight intensity={10} color={0xFFFFFF}/>
            <OrbitControls />
        </>
    )
}

export default Dog
