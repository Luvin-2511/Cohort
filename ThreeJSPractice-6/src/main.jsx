import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

createRoot(document.getElementById('root')).render(
  <Canvas>
    <App />
    <ambientLight intensity={2} />
    <pointLight intensity={1} />
    <OrbitControls />
    <EffectComposer>
      <Bloom intensity={1}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9} />
    </EffectComposer>
  </Canvas>
)
