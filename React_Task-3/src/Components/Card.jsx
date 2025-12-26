import React from 'react'

const Card = (props) => {
  return (
    <div className='h-[19rem] w-fit bg-[#171717] px-[3.5rem] py-[2rem] bordder-[1px] border-gray-400 rounded-2xl flex flex-col items-start justify-center gap-[1rem]'>
      <h3 className='text-white'>{props.title}</h3>
      <h5 className='w-[16rem] text-gray-400'>{props.side}</h5>
      <div className='flex items-center gap-2.5 mt-[1rem]'>
        <div className='px-[0.75rem] py-[0.4rem] flex items-center justify-center text-white text-[1rem] rounded-full hover:bg-[rgb(0,0,0,0.6)] cursor-pointer transition-all border-gray-600 border-[0.5px] bg-[rgba(0,0,0,0.3)] backdrop-blur-[1]'>↗</div>
        <h4 className='text-gray-400 text-[0.85rem] hover:text-white transition-all'>LEARN MORE</h4>
      </div>
    </div>
  )
}

export default Card
