import React, { useContext } from 'react'
import cursor from '../cursor.png'
import { canvasCon } from '../Context/CanvasContext'

const Cursor = (props) => {
    const { activeId, setActiveId } = useContext(canvasCon)
    
    return (
        <>
            <img
                ref={props.ref}
                className={`h-6 w-6 opacity-0  z-10 ${activeId?"hidden":"absolute"} pointer-events-none object-contain`}
                src={cursor}
                alt="Cursor img"
            />
        </>
    )
}

export default Cursor
