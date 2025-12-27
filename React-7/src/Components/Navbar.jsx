import React from 'react'

const Navbar = (props) => {
  return (
    <div style={{background:props.color}} className='h-[7rem] mb-[1rem] flex items-center justify-between px-16 py-4'>
      <h3 className='text-3xl font-bold uppercase hover:rotate-2 transition-all duration-100 cursor-pointer'>{props.title}</h3>
      <div className='flex text-2xl font-medium items-center justify-center gap-17'>
        {props.desc.map((elem,idx)=>{
            return  <h1 key={idx} className='hover:text-[rgb(255,255,255,0.7)] transition-all cursor-pointer'>{elem}</h1>
        })}
      </div>
    </div>
  )
}

export default Navbar
