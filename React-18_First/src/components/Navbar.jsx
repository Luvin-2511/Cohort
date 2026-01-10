import React from 'react'
import { useContext } from 'react'
import { AppContextPro } from '../context/AppContext'

const Navbar = () => {
    const { title } = useContext(AppContextPro)

    return (
        <div className='h-[7rem] flex items-center justify-between p-6 w-full '>
            <h1 className='tit text-4xl text-white uppercase font-bold'>{title}</h1>
            <div className='flex items-center text-gray-300 justify-center gap-8 text-xl mr-10'>
                <h3 className='hoverer relative overflow-hidden cursor-pointer px-4 py-2 rounded-2xl font-semibold'>Products</h3>
                <h3 className='hoverer relative overflow-hidden cursor-pointer px-4 py-2 rounded-2xl font-semibold'>Contact</h3>
                <h3 className='hoverer relative overflow-hidden cursor-pointer px-4 py-2 rounded-2xl font-semibold'>About</h3>
                <div className='flex items-center justify-center gap-2'>
                    <button className='px-4 py-2 hover:bg-emerald-900 transition-all cursor-pointer rounded font-semibold bg-emerald-600'>Login</button>
                    <button className='px-4 py-2 rounded hover:bg-gray-700 transition-all cursor-pointer font-semibold'>Sign in</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
