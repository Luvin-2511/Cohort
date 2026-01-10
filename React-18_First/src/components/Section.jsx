import React, { useContext } from 'react'
import { AppContextPro } from '../context/AppContext'

const Section = () => {
    const {theme,settheme} = useContext(AppContextPro)
  return (
    <div className='min-h-[43.8rem] w-full flex flex-col gap-10 items-center justify-center text-6xl font-semibold'>
      <h3>Currently theme is : {theme}</h3>
      <button onClick={()=>{
        if(theme=='Light'){
            settheme('Dark')
        }else {
            settheme('Light')
        }
      }} className='bg-emerald-400 rounded px-4 py-2 text-2xl hover:bg-emerald-600 transition-all cursor-pointer'>Change Theme</button>
    </div>
  )
}

export default Section
