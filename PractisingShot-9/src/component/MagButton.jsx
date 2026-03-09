import React, { useRef, useState } from "react";

const Button = ({ text }) => {
  const btnRef = useRef(null);
  const [btnPos, setBtnPos] = useState({
    x: 0,
    y: 0,
  });

  const splitText = text.split("");

  const radius = 140;
  const jumpFactor = 0.4;
  const handleEffect = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;

    const distance = Math.sqrt(x * x + y * y);
    if (distance < radius) {
      setBtnPos({
        x: x * jumpFactor,
        y: y * jumpFactor,
      });
    } else {
      setBtnPos({
        x: 0,
        y: 0,
      });
    }
  };

  return (
    <button
      style={{
        transform: `translate(${btnPos.x}px,${btnPos.y}px)`,
      }}
      ref={btnRef}
      onMouseMove={handleEffect}
      className="button-wrapper"
    >
      <h2 className="button-text">
        {splitText.map((letter, i) => {
          return (
            <span style={{ "--i": i }} className={i + 1}>
              {letter}
            </span>
          );
        })}
      </h2>
      <h2 className="button-text-hover">
        {splitText.map((letter, i) => {
          return (
            <span style={{ "--ihov": i }} className={i + 1}>
              {letter}
            </span>
          );
        })}
      </h2>
    </button>
  );
};

export default Button;
