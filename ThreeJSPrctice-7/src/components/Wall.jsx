import React from 'react'

const Wall = (props) => {
  
  return (
    <>
      <mesh position={props.position} rotation={props.rotation}>
        <boxGeometry args={props.args} />
        <meshStandardMaterial color='black' />
      </mesh>
    </>
  )
}

export default Wall
