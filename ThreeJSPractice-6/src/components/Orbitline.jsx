import React from 'react'

const Orbitline = ({ radius }) => {
    return (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.001, 16, 100]} />
            <meshBasicMaterial color="white" opacity={0.2} transparent />
        </mesh>
    )
}

export default Orbitline
