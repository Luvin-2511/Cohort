import React, { createContext, useRef, useState } from 'react'

export const canvasCon = createContext()

const CanvasContext = ({ children }) => {
    const [activeId, setActiveId] = useState(null)
    const [selectedShape, setSelectedShape] = useState(null)
    const [canvasColor, setCanvasColor] = useState('#1e1e1e')
    const shapeProperty = useRef({
        bg:'#d9d9d9',
        x:0,
        y:0,
        rot:0,
        wid:0,
        hgt:0,
        opacity:0,
        bradius:0,
    })
        

    return (
        <canvasCon.Provider value={{ activeId, setActiveId, selectedShape, setSelectedShape, canvasColor, setCanvasColor,shapeProperty }}>
            {children}
        </canvasCon.Provider>
    )
}

export default CanvasContext
