import React from 'react'

const Button = (props) => {
  return (
    <div className='px-[1rem] rounded-xl cursor-pointer w-fit py-[0.4rem] bg-green-400 text-black font-bold'>
      {props.text}
    </div>
  )
}

export default Button
