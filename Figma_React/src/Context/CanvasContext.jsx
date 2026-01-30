import React, { createContext, useState } from 'react'

export const canvasCon = createContext()

const CanvasContext = ({ children }) => {
    const [activeId, setActiveId] = useState(null)
    const [selectedShape, setSelectedShape] = useState(null)

    return (
        <canvasCon.Provider value={{ activeId, setActiveId, selectedShape, setSelectedShape }}>
            {children}
        </canvasCon.Provider>
    )
}

export default CanvasContext
