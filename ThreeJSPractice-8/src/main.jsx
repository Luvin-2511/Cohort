import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Canvas } from '@react-three/fiber'

createRoot(document.getElementById('root')).render(
  <Canvas>
    <ambientLight intensity={10}/>
    <App />
  </Canvas>
    
)
