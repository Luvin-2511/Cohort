import React from 'react'

const Button = (props) => {
  return (
    <div className='uppercase font-[400] hover:bg-[#FF6900] transition-all cursor-pointer px-[0.9rem] py-[0.4rem] rounded-sm text-[0.85rem] text-white bg-[#1A1A1A]'>
      {props.text}
    </div>
  )
}

export default Button
