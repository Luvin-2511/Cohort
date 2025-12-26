import React from 'react'
import img2 from '../assets/3.jpg'
import img3 from '../assets/4.jpg'
import Card2 from './Card2'

const Thirdpage = () => {
  return (
    <div className=' w-full px-[4rem] py-[2rem]'>
      <h1 className='text-5xl text-white uppercase'>Our Advantages</h1>
      <div className='flex h-[60vh] w-full items-center mt-[2rem] justify-center gap-[2rem]'>
        <div className='w-[50%] h-full rounded-2xl' style={{backgroundImage:`url(${img2})`,backgroundSize:'cover'}}></div>
        <div className="w-[50%] h-full flex flex-col gap-[2rem] rounded-2xl">
            <Card2 title='INDEPENDENT DESIGNERS' exp='Celebrating fashion-forward independent designers worldwide.'/>
            <Card2 title='EXCLUSIVE & UNIQUITY' exp='One-of-a-kind collections curated for exclusivity.'/>
        </div>
      </div>
      <div className='flex h-[60vh] w-full items-center mt-[2rem] justify-center gap-[2rem]'>
        <div className="w-[50%] h-full flex flex-col gap-[2rem] rounded-2xl">
            <Card2 title='HIGH QUALITY' exp='Embrace superior craftsmanship with meticulously curated, enduring garments.'/>
            <Card2 title='ECO-FRIENDLY' exp='Sustainable fashion crafted with planet-friendly materials.'/>
        </div>
        <div className='w-[50%] h-full rounded-2xl' style={{backgroundImage:`url(${img3})`,backgroundSize:'cover'}}></div>
      </div>
    </div>
  )
}

export default Thirdpage
