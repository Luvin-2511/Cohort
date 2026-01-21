import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'

createRoot(document.getElementById('root')).render(
  <Canvas>
    <ambientLight intensity={10}/>
    <Environment preset='sunset'/>
    <OrbitControls />
    <App />
  </Canvas>
)
