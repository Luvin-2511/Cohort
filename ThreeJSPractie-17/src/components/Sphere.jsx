import React from 'react'

const Sphere = ({position,color}) => {
  return (
    <>
      <mesh position={[position.x,position.y,position.z]}>
        <sphereGeometry args={[0.5,64,64]}/>
        <meshStandardMaterial color={`rgb(${color.r},${color.g},${color.b})`} metalness={0.5} roughness={0.2}/>
      </mesh>
    </>
  )
}

export default Sphere
