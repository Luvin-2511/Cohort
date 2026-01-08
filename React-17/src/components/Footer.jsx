import React, { useContext } from 'react'
import { webContext } from '../context/WebsiteContext'

const Footer = () => {
    const {footer} = useContext(webContext)
    
    
  return (
    <div className='h-[7rem] w-full  bg-gray-900 flex px-10 py-2 flex items-center justify-between'>
      <h1 className='text-center w-full'>{footer}</h1>
    </div>
  )
}

export default Footer
