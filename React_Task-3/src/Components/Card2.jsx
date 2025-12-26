import React from 'react'

function Card2(props) {
  return (
    <div className='h-[47%] text-white bg-[#171717] px-[2rem] py-[4rem] bordder-[1px] border-gray-400 rounded-2xl flex flex-col items-start justify-start gap-[1rem]'>
      <h4>{props.title}</h4>
      <h5 className='text-gray-400'>{props.exp}</h5>
      <div className=' w-full flex items-end mt-[1rem] justify-end'>
        <div className=' px-[0.75rem] py-[0.4rem] flex items-center justify-center text-white text-[1rem] rounded-full hover:bg-[rgb(0,0,0,0.6)] cursor-pointer transition-all border-gray-600 border-[0.5px] bg-[rgba(0,0,0,0.3)] backdrop-blur-[1]'>↗</div>
        </div>
    </div>
  )
}

export default Card2
