import React from 'react'
import cursor from '../cursor.png'

const Cursor = (props) => {
    return (
        <>
            <img ref={props.ref} className='h-6 w-6 opacity-0 absolute  pointer-events-none object-contain' src={cursor} alt="Cursor img" />
        </>
    )
}

export default Cursor
