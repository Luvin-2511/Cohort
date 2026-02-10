import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Sphere from "./components/Sphere";

const App = () => {
  const arr = new Array(200).fill(0);

  return (
    <Canvas>
      {arr.map((e, idx) => {
        const color = {
          r: Math.floor(Math.random() * 255),
          g: Math.floor(Math.random() * 255),
          b: Math.floor(Math.random() * 255),
        };
        const position = {
          x: Math.floor(Math.random() * 200 - 100),
          y: Math.floor(Math.random() * 200 - 100),
          z: Math.floor(Math.random() * 200 - 100),
        };
        return <Sphere key={idx} position={position} color={color} />;
      })}
      <ambientLight intensity={1} />
      <Environment preset="sunset" />
      <OrbitControls />
    </Canvas>
  );
};

export default App;
