import { shaderMaterial } from "@react-three/drei"
import { Canvas, extend, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

const MyMat = shaderMaterial(
  { uTime: 0 },
  `
  varying vec2 vUv;
  uniform float uTime;

  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.z += sin(pos.x * 5.0 + uTime) * 0.2;
    pos.z += sin(pos.y * 5.0 + uTime) * 0.2;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }`,
  `
  varying vec2 vUv;
  uniform float uTime;

  void main() {
    vec3 color = vec3(vUv.x, sin(uTime) * 0.5 + 0.5, vUv.y);
    gl_FragColor = vec4(color, 1.0);
  }`
)

extend({ MyMat })

function Wave() {
  const ref = useRef()

  useFrame(({ clock }) => {
    ref.current.uTime = clock.getElapsedTime()
  })

  return (
    <mesh rotation={[-Math.PI / 3, 0, 0]}>
      <planeGeometry args={[3, 3, 32, 32]} />
      <myMat ref={ref} side={THREE.DoubleSide} />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 4] }}>
      <Wave />
    </Canvas>
  )
}