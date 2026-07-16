import React, { useState } from "react";

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [coor, setCoor] = useState({
    x: 0,
    y: 0,
  });
  return (
    <main
      onMouseEnter={() => {
        setIsVisible(true);
      }}
      onMouseMove={(e) => {
        setCoor({
          x: e.clientX,
          y: e.clientY,
        });
      }}
      onMouseLeave={() => {
        setIsVisible(false);
      }}
    >
      <div
  className="upper"
  style={{
    WebkitMaskImage: `radial-gradient(
      400px circle at ${coor.x}px ${coor.y}px,
      transparent 0,
      transparent 180px,
      black 220px
    )`,
    maskImage: `radial-gradient(
      400px circle at ${coor.x}px ${coor.y}px,
      transparent 0,
      transparent 180px,
      black 220px
    )`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  }}
></div>
      <div className="lower"></div>
    </main>
  );
};

export default App;
