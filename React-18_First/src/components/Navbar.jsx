import React from 'react'
import { useContext } from 'react'
import { AppContextPro } from '../context/AppContext'

const Navbar = () => {
    const {title} = useContext(AppContextPro)

    return (
        <div className='h-[7rem] w-full bg-gray-900'>
            <h1>{title}</h1>
        </div>
    )
}

export default Navbar
