import { useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react'
import { BackSide, DoubleSide } from 'three';

const Carousel = () => {
  const groupRef = useRef(null)
  const projects = [
    {
      id: 1,
      name: "Maze Game",
      color: "#ff6b6b"
    },
    {
      id: 2,
      name: "Solar System",
      color: "#4ecdc4"
    },
    {
      id: 3,
      name: "Bouncing Balls",
      color: "#45b7d1"
    },
    {
      id: 4,
      name: "Portfolio Site",
      color: "#f9ca24"
    },
    {
      id: 5,
      name: "3D Carousel",
      color: "#6c5ce7"
    }
  ]

  const radius = 10
  const angle = (Math.PI * 2) / projects.length

  // useFrame(()=>{
  //   groupRef.current.rotation.y+=0.005
  // })

  return (
    <>
    <group ref={groupRef}>
      {projects.map((project) => {
        const newAngle = angle * (project.id+1)
        const x = Math.cos(newAngle)*radius
        const z = Math.sin(newAngle)*radius
        return <mesh rotation={[0,-newAngle,0]} key={project.id} position={[x,0,z]}>
          <planeGeometry args={[5,7]}/>
          <meshStandardMaterial color={project.color} side={DoubleSide}/>
        </mesh>
      })}
      </group>
    </>
  )
}

export default Carousel
