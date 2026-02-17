import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import GunModel from "./components/GunModel";
import React, { useRef, useState } from "react";
function App() {
  const gunRef = useRef(null);
  const soundRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  let intervalRef = useRef(null);
  const [shots, setShots] = useState([]);
  const [firing, isFiring] = useState(false);
  const crossRef = useRef(null);
  const [crossVisible, isCrossVisible] = useState(false);
  const handleCrosshair = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    mouseRef.current = { x, y };
    crossRef.current.style.left = `${x}px`;
    crossRef.current.style.top = `${y}px`;
  };

  let paintingSplats = [
    "red1.webp",
    "red2.webp",
    "blue1.webp",
    "blue2.webp",
    "yellow1.webp",
    "purple1.webp",
  ];
  const shoot = () => {
    const { x, y } = mouseRef.current;
    const indexing = Math.floor(Math.random() * paintingSplats.length);
    const newShot = {
      x: x,
      y: y,
      id: Date.now(),
      src: paintingSplats[indexing],
    };

    setShots((prev) => [...prev, newShot]);

    setTimeout(() => {
      setShots((prev) => prev.filter((s) => s.id != newShot.id));
    }, 400);
  };

  const showCrosshair = () => {
    isCrossVisible(true);
  };
  const hideCursor = () => {
    isCrossVisible(false);
  };

  const firingStarts = () => {
    isFiring(true);
    shoot();
    soundRef.current.currentTime = 0;
    soundRef.current.play();
    intervalRef.current = setInterval(() => {
      soundRef.current.currentTime = 0;
      soundRef.current.play();
      shoot();
    }, 120);
  };

  const firingStops = () => {
    isFiring(false);
    clearInterval(intervalRef.current);
  };

  const gunMove = (e) => {
    gunRef.current.rotation.y = (-e.clientX/window.innerWidth)*Math.PI/2 -Math.PI/4
    gunRef.current.rotation.x =( -e.clientY/window.innerHeight)*Math.PI/4+Math.PI/18
  };

  return (
    <main
      style={{
        animation: firing ? "shaker 0.12s infinite" : "",
      }}
      onMouseMove={handleCrosshair}
      onMouseEnter={showCrosshair}
      onMouseLeave={hideCursor}
      onMouseDown={firingStarts}
      onMouseUp={firingStops}
    >
      <audio ref={soundRef} src="sound1.mp3"></audio>
      <svg
        style={{
          display: crossVisible ? "flex" : "none",
        }}
        ref={crossRef}
        fill="#000000"
        width="800px"
        height="800px"
        className="crosshair"
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>crosshair</title>
        <path d="M30 15.25h-3.326c-0.385-5.319-4.605-9.539-9.889-9.922l-0.035-0.002v-3.326c0-0.414-0.336-0.75-0.75-0.75s-0.75 0.336-0.75 0.75v0 3.326c-5.319 0.385-9.539 4.605-9.922 9.889l-0.002 0.035h-3.326c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h3.326c0.385 5.319 4.605 9.539 9.889 9.922l0.035 0.002v3.326c0 0.414 0.336 0.75 0.75 0.75s0.75-0.336 0.75-0.75v0-3.326c5.319-0.385 9.539-4.605 9.922-9.889l0.002-0.035h3.326c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM16.75 25.174v-3.174c0-0.414-0.336-0.75-0.75-0.75s-0.75 0.336-0.75 0.75v0 3.174c-4.492-0.378-8.046-3.932-8.422-8.39l-0.002-0.034h3.174c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0h-3.174c0.378-4.492 3.932-8.046 8.39-8.422l0.034-0.002v3.174c0 0.414 0.336 0.75 0.75 0.75s0.75-0.336 0.75-0.75v0-3.174c4.492 0.378 8.046 3.932 8.422 8.39l0.002 0.034h-3.174c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h3.174c-0.379 4.492-3.932 8.045-8.39 8.422l-0.034 0.002z"></path>
      </svg>

      <Canvas
      style={{
        zIndex:100,
      }} 
       onPointerMove={gunMove}>
        <directionalLight intensity={1} position={[0, 0, 2]} />
        <Environment preset="sunset" />
        <ambientLight />
        {/* <OrbitControls enableZoom={false} /> */}
        <GunModel gunRef={gunRef} />
      </Canvas>

      {shots.map((shot, idx) => {
        return (
          <img
            key={idx}
            style={{
              width: "10rem",
              position: "absolute",
              left: `${shot.x}px`,
              top: `${shot.y}px`,
              pointerEvents: "none",
              transform: "translate(-40%,-40%)",
            }}
            src={shot.src}
            alt=""
          />
        );
      })}
    </main>
  );
}

export default App;
