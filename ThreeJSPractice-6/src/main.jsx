import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

createRoot(document.getElementById('root')).render(
  <Canvas>
    <App />
    <ambientLight intensity={1}/>
    <pointLight intensity={1}/>
    <OrbitControls />
  </Canvas>
    
)
