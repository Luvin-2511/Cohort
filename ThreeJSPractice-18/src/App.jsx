import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

const Sphere = () => {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 64, 64]} />
      <meshStandardMaterial color="red" metalness={0.5} />
    </mesh>
  );
};

const App = () => {
  return (
    <div>
      <Canvas
        onPointerMove={(e) => {
          console.log(e);
        }}
      >
        <Environment preset="sunset" />
        <ambientLight intensity={1} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default App;
