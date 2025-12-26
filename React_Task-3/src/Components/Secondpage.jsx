import React from 'react'
import Card from './Card'
import img1 from '../assets/2.jpg'

const Temp = (props) => {
    return (
        <div className="flex flex-col gap-[1rem] items-center">
            <h4 className='text-[1rem]  text-gray-600'>{props.dets}</h4>
            <h1 className='text-white text-4xl'>{props.count}+</h1>
        </div>
    )
}

const Secondpage = () => {
    return (
        <div >
            <div className='flex items-center justify-center gap-[2rem] mt-[2rem]'>
                <Card
                    title='INDEPENDENCY'
                    side='Explore the creativity of independent designers from around the globe.'
                />

                <Card
                    title='UNIQUITY'
                    side='Discover the charm of unique pieces that stand out effortlessly.'
                />

                <Card
                    title='QUALITY'
                    side='Experience unparalleled craftsmanship and attention to detail.'
                />

                <Card
                    title='SUSTAINABILITY'
                    side='Embrace eco-conscious fashion choices without compromising on style.'
                />

            </div>
            <div className='flex items-center justify-around gap-[2rem] mt-[4rem]'>
                <Temp dets='DESIGNERS' count='150' />
                <Temp dets='CLIENTS' count='500' />
                <Temp dets='MASTERPIECES' count='20K' />
                <Temp dets='EVENTS' count='50' />
            </div>
            <div className='flex h-[35vw] items-center justify-around  mt-[4rem]'>
                <div className="w-[45vw] h-[35vw]  text-white bg-[#171717] px-[3.5rem] py-[5rem] bordder-[1px] border-gray-400 rounded-2xl flex flex-col items-start justify-center gap-[2rem]">
                    <h5 className='text-gray-400 text-[0.9rem]'>ABOUT</h5>
                    <h2 className='text-gray-300 text-4xl mt-[1rem] mb-[1rem]'>WHERE FASHION MEETS FREEDOM</h2>
                    <div className='flex text-gray-400 items-start gap-[2rem]'>
                        <h4 className='w-[18rem]'>We believe that fashion should be an expression of individuality. We encourage creativity and originality in every item we offer, presenting customers with exclusive collections from independent designers. With a commitment to fostering a community of creativity and innovation.</h4>
                        <h4 className='w-[18rem]'>We strive to connect designers with fashion enthusiasts who appreciate the artistry and individuality behind each piece. Driven by our dedication to authenticity, we curate each collection with a keen eye for unique designs that inspire confidence and self-expression.</h4>
                    </div>
                </div>
                <div className="w-[45vw] h-[35vw] rounded-2xl" style={{ backgroundImage: `url(${img1})`,backgroundSize:'cover' }}></div>
            </div>
        </div>
    )
}

export default Secondpage
