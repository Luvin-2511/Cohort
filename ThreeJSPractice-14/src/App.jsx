import { Environment, Loader, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import Navbar from "./components/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { Suspense, useRef, useState } from "react";
gsap.registerPlugin(ScrollTrigger, useGSAP);

const Model = ({ modelRef, onModelLoaded }) => {
  const model = useGLTF("/Miles.glb");
  const [hasNotified, setHasNotified] = useState(false);

  useFrame(() => {
    if (modelRef.current && !hasNotified) {
      onModelLoaded();
      setHasNotified(true);
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={model.scene}
      position={[-0.5, -14, 0]}
      scale={10}
    />
  );
};

const ThreeElement = ({ modelRef, onModelLoaded }) => {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Environment preset="sunset" />
        <ambientLight intensity={10} position={[0, 10, 0]} />
        <Model modelRef={modelRef} onModelLoaded={onModelLoaded} />
      </Suspense>
    </Canvas>
  );
};

const App = () => {
  const modelRef = useRef(null);
  const [ModelLoaded, setModelLoaded] = useState(false);

  useGSAP(() => {
    if (!modelRef.current || !ModelLoaded) return;
    
    gsap.to(
      modelRef.current.position,
      {
        x: -5,
        scrollTrigger: {
          trigger: "#page1",
          endTrigger: "#page2",
          start: "top top",
          end: "bottom top",
          markers: true,
          scrub: true,
        },
      },
      "a",
    );
    gsap.to(
      modelRef.current.rotation,
      {
        y: 2,
        scrollTrigger: {
          trigger: "#page1",
          endTrigger: "#page2",
          start: "top top",
          end: "bottom top",
          markers: true,
          scrub: true,
        },
      },
      "a",
    );
  }, [ModelLoaded]);

  return (
    <>
      <main>
        <div className="abover">
          <Navbar />
          <ThreeElement
            modelRef={modelRef}
            onModelLoaded={() => setModelLoaded(true)}
          />
          <Loader />
        </div>
        <div className="pages">
          <h1 className="hero-heading-front">Miles </h1>
          <div id="page-1">
            <h1 className="hero-heading">Morales </h1>
          </div>
          <div id="page-2"></div>
        </div>
      </main>
    </>
  );
};

export default App;