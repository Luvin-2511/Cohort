import React, { useEffect, useState } from 'react'

const App = () => {
  const [num1, setnum1] = useState(0)
  const [num3, setnum3] = useState(0)
  const [num2, setnum2] = useState(0)
  useEffect(() => {
    console.log("UseEffect working");
  }, [num1,num2])

  return (
    <div className='h-screen flex flex-col items-center gap-3 justify-center'>
      <div className='flex flex-col gap-4 items-center'>
        <h1 className='text-5xl font-bold'>{num1}</h1>
        <button
        onClick={()=>{
          setnum1(num1+1)
        }} className='p-3 bg-blue-500 cursor-pointer rounded-xl'>Increase</button>
      </div>
      <div className='flex flex-col gap-4 items-center'>
        <h1 className='text-5xl font-bold'>{num2}</h1>
        <button
        onClick={()=>{
          setnum2(num2+1)
        }} className='p-3 bg-blue-500 cursor-pointer rounded-xl'>Increase</button>
      </div>
      <div className='flex flex-col gap-4 items-center'>
        <h1 className='text-5xl font-bold'>{num3}</h1>
        <button
        onClick={()=>{
          setnum3(num3+1)
        }} className='p-3 bg-blue-500 cursor-pointer rounded-xl'>Increase</button>
      </div>
    </div>
  )
}

export default App
