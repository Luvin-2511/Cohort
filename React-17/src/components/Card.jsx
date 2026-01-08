import React, { useContext } from 'react'
import bg1 from '../assets/bg6.jpg'
import pro1 from '../assets/1.avif'
import follow from '../assets/follow.svg'
import insta from '../assets/ins.svg'
import x from '../assets/xx.svg'
import a from '../assets/@.svg'


const Card = (props) => {
    console.log(props);
    
    return (
        <div className='px-[0.5rem] shrink-0  py-[0.5rem]  w-fit rounded-2xl bg-white flex flex-col'>
            <div className="w-[18rem] h-[10rem] relative rounded-2xl overflow-hidden">
                <img src={props.data.bgImage} alt="bg-img" />
                <div className='h-[2.5rem] w-[2.5rem] hover:bg-[rgb(255,255,255,0.5)] cursor-pointer px-[0.4rem] py-[0.4rem] absolute top-3 right-3 rounded-full bg-[rgb(255,255,255,0.3)] backdrop-blur-xl'>
                    <img src={follow} alt="" />
                </div>
            </div>
            <div className='h-[6rem] w-[6rem] hover:border-pink-500 transition-all cursor-pointer relative -top-[3rem] -right-[5%] border-4 border-white overflow-hidden bg-gray-500 rounded-full'>
                <img src={props.data.profile} alt="" />
            </div>
            <div className='-mt-[2rem] ml-[0.5rem] p-2'>
                <h2 className='font-semibold mb-2 text-2xl'>{props.data.name}</h2>
                <h5 className='text-gray-500 text-[0.9rem] w-[15rem] font-medium'>{props.data.desc}</h5>
            </div>
            <div className='w-full flex p-2 mt-[1rem] rounded-2xl shadow-black'>
                <div className='w-1/3 flex items-center flex-col'>
                    <h2 className='font-bold text-[1.2rem]'>{props.data.likes}</h2>
                    <h4 className='font-semibold text-[0.9rem] text-gray-600'>Likes</h4>
                </div>
                <div className='w-1/3 flex items-center flex-col'>
                    <h2 className='font-bold text-[1.2rem]'>{props.data.posts}</h2>
                    <h4 className='font-semibold text-[0.9rem] text-gray-600'>Posts</h4>
                </div>
                <div className='w-1/3 flex items-center flex-col'>
                    <h2 className='font-bold text-[1.2rem]'>{props.data.views}</h2>
                    <h4 className='font-semibold text-[0.9rem] text-gray-600'>Views</h4>
                </div>
            </div>
            <div className='w-full mt-[1rem] rounded-2xl bg-[#F5F5F5] py-2 flex items-center justify-center gap-[3rem]'>
                <img className='h-[1.5rem] cursor-pointer hover:invert-50 transition-all' src={insta} alt="" />
                <img className='h-[1.5rem] cursor-pointer hover:invert-50 transition-all' src={x} alt="" />
                <img className='h-[1.5rem] cursor-pointer hover:invert-50 transition-all' src={a} alt="" />
            </div>
        </div>
    )
}

export default Card
