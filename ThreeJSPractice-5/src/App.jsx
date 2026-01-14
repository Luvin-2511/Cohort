import React, { useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const Ball = ({startpos,startvel}) => {
  const ballRef = useRef(null)
  const velocity = useRef(startvel)

  useFrame(()=>{
    ballRef.current.position.y+=velocity.current.y
    ballRef.current.position.x+=velocity.current.x
    ballRef.current.position.z+=velocity.current.z
    velocity.current.y-=0.001
    if(ballRef.current.position.y<=-2.5){
      ballRef.current.position.y = -2.5
      velocity.current.y = -velocity.current.y * 0.8
    }
    if(ballRef.current.position.x>=10 || ballRef.current.position.x<=-10 ){
      velocity.current.x = -velocity.current.x
    }
    if(ballRef.current.position.z>=10 || ballRef.current.position.z<=-10 ){
      velocity.current.z = -velocity.current.z
    }
    
  })
  return (
    <mesh ref={ballRef} position={startpos}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color='red' />
    </mesh>
  )
}

const App = () => {
  const balls = []
  let Ballcount = 100
  for (let i = 0; i <= Ballcount; i++) {
    balls.push({
      pos: [
        Math.random() * 20 - 10,    // random x between -10 and 10
        Math.random() * 10 + 5,     // random y between 5 and 15
        Math.random() * 10 - 15     // random z between -15 and -5
      ],
      vel: {
        x: Math.random() * 0.1 - 0.05,   // random x velocity
        y: 0,
        z: Math.random() * 0.1 - 0.05    // random z velocity
      }
    })
  }

  return (
    <>
      {balls.map((ball,idx)=>{
        return <Ball key={idx} startpos={ball.pos} startvel={ball.vel}/>
      })}
      <OrbitControls />
    </>
  )
}

export default App
