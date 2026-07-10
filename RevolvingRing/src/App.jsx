import {  OrbitControls, Stars } from "@react-three/drei";
import Ring from "../src/component/Ring";
import { Canvas } from "@react-three/fiber";

const App = () => {
  return (
    <Canvas dpr={[1, 1.5]}>
      <OrbitControls enableZoom={false} enableDamping />
      <pointLight intensity={1} />
      <ambientLight intensity={1} />
      <Ring />
      <Stars radius={5} depth={50} count={300} fade />
    </Canvas>
  );
};

export default App;
