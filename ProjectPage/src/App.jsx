import { Canvas } from "@react-three/fiber";
import Group from "./components/Group";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const App = () => {
  const canvasRef = useRef(null);
  const timelineRef = useRef(null);
  useGSAP(() => {
    timelineRef.current = gsap.timeline();
  });

  return (
    <>
      <div ref={canvasRef} className="canvas-wrapper">
        <Canvas
          camera={{
            position: [0, 0, -10],
          }}
        >
          <ambientLight intensity={1} />
          <pointLight intensity={1} color={"white"} />
          <Group timeline={timelineRef} />
        </Canvas>
      </div>
    </>
  );
};

export default App;
