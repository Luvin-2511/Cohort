import React, { useContext, useState } from 'react'
import { webContext } from '../context/WebsiteContext'
import Card from './Card'

const Section = () => {
    const [newTitle, setnewTitle] = useState('')
    const { titleChanger } =useContext(webContext)
    const {arr} = useContext(webContext)
    
    
    return (
        <div className='min-h-[40vw] w-full bg-black'>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    titleChanger(newTitle)
                    setnewTitle('')
                }} className='flex justify-center mt-10 gap-5'>
                <input
                    value={newTitle}
                    onChange={(e) => {
                        setnewTitle(e.target.value)
                    }} className='px-7 py-2 rounded-xl border-2 border-gray-400' type="text" placeholder="Enter the website's title" />
                <button className='bg-emerald-600 py-2 px-4 rounded'>Enter</button>
            </form>
            <div className='h-full w-full p-5 flex gap-5 flex-wrap'>
                {arr.map((elem,idx)=>{
                    return <Card key={idx} data={elem}/>
                })}
            </div>
        </div>
    )
}

export default Section
