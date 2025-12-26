import React from 'react'
import hero from '../assets/hero.png'

const Hero = () => {
  return (
    <div className='h-[85vh] pt-[17rem] pl-[12rem] w-[97%] mx-[2rem]' style={{backgroundImage:`url(${hero})`}}>
      <h1 className='text-8xl font-light leading-[7rem] tracking-[0.8rem] text-white'>DESIGN</h1>
      <h1 className='text-8xl font-light pl-[5rem] tracking-[0.8rem] text-white'>& FREEDOM</h1>
      <div className='flex items-center justify-between mt-[1.5rem]'>
        <div className='font-medium text-gray-600 leading-[1.2rem]'>
            <h5>Explore Independent Style by Embracing Uniqueness</h5>
            <h5>with Our Exclusive Designer Apparel</h5>
        </div>
        <div className='flex items-center justify-center gap-[0.5rem] mr-[10rem] '>
            <div className='px-[1rem] py-[0.5rem] text-white text-[1rem] rounded-full hover:bg-[rgb(0,0,0,0.6)] cursor-pointer transition-all border-white border-[0.5px] bg-[rgba(0,0,0,0.3)] backdrop-blur-[1]'>↓</div>
            <h4 className='text-gray-400 text-[0.85rem] hover:text-white transition-all'>LEARN MORE</h4>
        </div>
      </div>
    </div>
  )
}

export default Hero
