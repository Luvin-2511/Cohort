import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'


const App = () => {
  const [currentIndex, setcurrentIndex] = useState(0)

  const photos = [
    { color: "#0f172a" }, // deep navy
    { color: "#1f2937" }, // blue-gray
    { color: "#2b2b2b" }, // soft dark gray
    { color: "#3f3f46" }, // neutral gray
    { color: "#52525b" }, // concrete gray
    { color: "#22d3ee" }, // cyan accent
    { color: "#8b5cf6" }, // soft purple
    { color: "#f97316" }, // warm orange
    { color: "#e5e7eb" }, // off-white
    { color: "#16a34a" }  // muted green
  ];

  const visiblephotos = [
    photos[currentIndex % photos.length],
    photos[(currentIndex + 1) % photos.length],
    photos[(currentIndex + 2) % photos.length],
  ]

  const nextCard = () => {
    setcurrentIndex(prev => prev + 1)
  }

  return (
    <div>
      <Canvas style={{
        position: 'fixed'
      }}>
        <ambientLight intensity={10} />
        <OrbitControls />
        {visiblephotos.map((photo, index) => {
          return <mesh position={[0, -index * 0.5, -index * 1]} scale={1 - index * 0.1}>
            <planeGeometry args={[14, 6]} />
            <meshStandardMaterial color={photo.color} />
          </mesh>
        })}
      </Canvas>
      <button
      onClick={nextCard}
       style={{
        padding: "0.8rem 1rem",
        background: "#f97316",
        border: 'none',
        outline: 'none',
        scale: '1.3',
        marginLeft: '50%',
        marginTop: '50%',
        borderRadius: '0.2rem',
        transform: 'translateX(-50%)',
        cursor: 'pointer',
        color: 'black',
        fontSize: '1rem'
      }}>
        Next Card →
      </button>
    </div>
  )
}

export default App
