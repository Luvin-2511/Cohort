import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'

createRoot(document.getElementById('root')).render(
  <Canvas>
    <Environment preset='sunset'/>
    <OrbitControls />
    <ambientLight intensity={10} />
    <App />
  </Canvas>
)
