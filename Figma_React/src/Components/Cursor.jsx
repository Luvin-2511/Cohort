import React from 'react'
import cursor from '../cursor.png'

const Cursor = (props) => {
    return (
        <>
            <img ref={props.ref} className='h-6 w-6 absolute object-contain' src={cursor} alt="Cursor img" />
        </>
    )
}

export default Cursor
