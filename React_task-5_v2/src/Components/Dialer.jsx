import React from 'react'

const Dialer = (props) => {
  return (
    <div className='dialer h-[5rem] cursor-pointer transition-all hover:bg-amber-300 shrink-0 w-[5rem] flex items-center justify-center bg-[#E4E4E4] text-black rounded-full'>
      <h1 className='dialer text-4xl font-extrabold'>{props.num}</h1>
    </div>
  )
}

export default Dialer
