import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

createRoot(document.getElementById('root')).render(
  <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
    <App />
    <ambientLight intensity={1} />

    <directionalLight position={[0,3,2]} intensity={10} />
    <OrbitControls />
  </Canvas >
)
