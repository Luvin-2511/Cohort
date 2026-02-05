import { Environment, useGLTF, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
// import React, { useState } from 'react'
import Navbar from "./components/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger, useGSAP);

const ThreeElement = ({ scale }) => {
  const model = useGLTF("/Miles.glb");
  const modelRef = useRef();
  useGSAP(
    () => {
      if (!modelRef.current) return;
      gsap.to(modelRef.current.position, {
        z: 20,
        scrollTrigger: {
          trigger: "#page-1",
          endTrigger: "#page-2",
          markers: true,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { dependencies: [model], scope: modelRef },
  );

  return (
    <Canvas>
      <Environment preset="sunset" />
      <ambientLight intensity={10} position={[0, 10, 0]} />
      {/* <OrbitControls /> */}
      <primitive
        ref={modelRef}
        object={model.scene}
        position={[-0.5, -14, 0]}
        scale={scale}
      />
    </Canvas>
  );
};

const App = () => {
  return (
    <>
      <main>
        <div className="abover">
          <Navbar />
          <ThreeElement scale={10} />
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
