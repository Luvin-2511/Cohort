import React from "react";
import { animate, stagger } from "animejs";

const Dots = ({ gridHeight = 20, gridWidth = 30 }) => {
  const dots = [];

  for (let i = 0; i < gridHeight; i++) {
    for (let j = 0; j < gridWidth; j++) {
      const index = i * gridWidth + j;

      dots.push(
        <div
          className="dot-wrapper"
          data-index={index}
          key={index}
        >
          <div className="dot"></div>
        </div>
      );
    }
  }

  const handleClick = (e) => {
    const wrapper = e.target.closest(".dot-wrapper");
    if (!wrapper) return;

    const index = Number(wrapper.dataset.index);

    animate(".dot-wrapper", {
      scale: [
        { to: 1.25, ease: "outSine", duration: 250 },
        { to: 1, ease: "inOutQuad", duration: 500 }
      ],
      translateY: [
        { to: -15, ease: "outSine", duration: 250 },
        { to: 0, ease: "inOutQuad", duration: 500 }
      ],
      opacity: [
        { to: 1, duration: 250 },
        { to: 0.5, duration: 500 }
      ],
      delay: stagger(40, {
        grid: [gridWidth, gridHeight],
        from: index
      })
    });
  };

  return (
    <div
      onClick={handleClick}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${gridWidth},1fr)`
      }}
      className="dots-container"
    >
      {dots}
    </div>
  );
};

export default Dots;