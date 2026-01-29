import React, { createContext, useState } from 'react'

export const canvasCon = createContext()

const CanvasContext = ({ children }) => {
    const [rect,isRect] = useState(false)
    return (
        <canvasCon.Provider value={[rect,isRect]}>
            {children}
        </canvasCon.Provider>
    )
}

export default CanvasContext
