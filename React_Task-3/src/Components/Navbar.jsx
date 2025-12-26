import React from 'react'
import Button from './Button'

const Navbar = () => {
  return (
    <div className='h-[4.5rem] w-[100vw] px-10 flex pr-[3.5rem] items-center justify-between'>
        <h3 className='text-xl text-white font-bold'>DV$Y</h3>
        <div className='flex items-center justify-center gap-[1rem]'>
            <Button text='Designers'/>
            <Button text='Collabs'/>
            <Button text='Events'/>
            <Button text='Blog'/>
            <Button text='Card'/>
            <Button text='Get in touch'/>
        </div>
    </div>
  )
}

export default Navbar
