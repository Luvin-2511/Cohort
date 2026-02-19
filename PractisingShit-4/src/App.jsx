import React, { useRef } from "react";

const App = () => {
  const hoverRef = useRef(null);
  const parentRef = useRef(null);

  const lightMove = (e) => {
    const rectBound = parentRef.current.getBoundingClientRect();
    const x = e.clientX - rectBound.left;
    const y = e.clientY - rectBound.top;
    hoverRef.current.style.left = x + "px";
    hoverRef.current.style.top = y + "px";
    const halfWidth = rectBound.width/2
    const halfheight = rectBound.height/2
    const rotateX = (x-halfheight)*-10
    const rotateY = (y-halfWidth)*10
    parentRef.current.style.transform = `rotate3d(${rotateX},${rotateY},0,20deg)`;
  };
  
  const lightHide = () => {
    hoverRef.current.style.opacity = 0;
    parentRef.current.style.transform = `rotate3d(0,0,0,0)`;
  };
  const lightShow = () => {
    hoverRef.current.style.opacity = 1;
  };

  return (
    <main>
      <div
        onMouseMove={lightMove}
        onMouseLeave={lightHide}
        onMouseEnter={lightShow}
        ref={parentRef}
        className="container"
      >
        <div ref={hoverRef} className="after"></div>
      </div>
    </main>
  );
};

export default App;
