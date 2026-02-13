import React, { createContext, useState } from "react";

export const canvasCon = createContext();

const CanvasContext = ({ children }) => {
  const [activeId, setActiveId] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [canvasColor, setCanvasColor] = useState("#1e1e1e");
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [circs, setCircs] = useState([]);
  const [rects, setRects] = useState([]);

  const [shapeProperty, setShapeProperty] = useState({
    bg: "#d9d9d9",
    x: 0,
    y: 0,
    rot: 0,
    wid: 0,
    hgt: 0,
    opacity: 0,
    bradius: 0,
  });

  return (
    <canvasCon.Provider
      value={{
        activeId,
        setActiveId,
        selectedShape,
        setSelectedShape,
        canvasColor,
        setCanvasColor,
        shapeProperty,
        setShapeProperty,
        dragging,
        setDragging,
        resizing,
        setResizing,
        circs,
        setCircs,
        rects,
        setRects
      }}
    >
      {children}
    </canvasCon.Provider>
  );
};

export default CanvasContext;
