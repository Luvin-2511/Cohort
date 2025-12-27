import React, { useState } from 'react'

const App = () => {
  const [count, setcount] = useState(0)
  const increase = () => {
    setcount(count + 1)
  }
  const decrease = () => {
    setcount(count - 1)
  }
  const increase5 = () => {
    setcount(count + 5)
  }
  const random = () => {
    setcount(Math.floor(Math.random() * 101))
  }

  const [num, setnum] = useState(0)
  const arr = ['Mike', 'Lucas', 'Will', 'Dik', 'Eleven']

  const [marks, setmarks] = useState([30, 60, 24, 64, 99])
  const [gender, setgender] = useState('Male')

  return (
    <>
      <div className=' flex flex-col items-center gap-8 justify-center font-bold text-3xl text-center w-[100vw] bg-black text-white'>
        {count}
        <button
          onClick={() => {
            increase();
          }}
          className='w-fit cursor-pointer active:scale-95 py-[0.4rem] px-[1rem] rounded-xl bg-green-800'>Icremental</button>
        {
          count > 0 ?
            <button
              onClick={() => {
                decrease();
              }}
              className='w-fit cursor-pointer active:scale-95 py-[0.4rem] px-[1rem] rounded-xl bg-green-800'>Decremental</button>
            :
            <></>
        }
        <button
          onClick={() => {
            increase5();
          }}
          className='w-fit cursor-pointer active:scale-95 py-[0.4rem] px-[1rem] rounded-xl bg-green-800'>Jump by 5</button>

        <button
          onClick={() => {
            random();
          }}
          className='w-fit cursor-pointer active:scale-95 py-[0.4rem] px-[1rem] rounded-xl bg-green-800'>Random</button>

      </div>
      <hr className='bg-white my-[2rem]' />
      <h1 className='text-4xl font-bold text-center mt-[1rem]'>{arr[num]}</h1>
      <button
        onClick={() => {
          if (num < arr.length - 1) {
            setnum(num + 1)
          }
        }}
        className='ml-[47%] mt-[1rem] text-2xl font-semibold p-3 bg-gray-400 text-white rounded-2xl'>Change</button>
      {marks.map((elem, idx) => {
        return <h1 className='font-bold text-5xl text-center mt-[1rem]'>Student {idx}: {elem} ({elem > 33 ? 'Pass' : 'Fail'})</h1>
      })}
      <button
        onClick={() => {
          const newMarks = marks.map((elem) => {
            if (elem > 95) {
              return elem
            } else {
              return elem + 5
            }
          })
          setmarks(newMarks)
        }}
        className='ml-[47%] active:scale-95 mt-[1rem] text-2xl font-semibold p-3 bg-gray-400 text-white rounded-2xl'>Give grace</button>
      <hr className='my-[2rem]' />
      <h1 className='text-4xl font-bold text-center'>{gender}</h1>
      <button
      onClick={()=>{
        if(gender=='Male'){
          setgender('Female')
        }else if(gender=='Female'){
          setgender('Other')
        }else{
          setgender('Male')
        }
      }}
        className='ml-[47%] active:scale-95 mt-[1rem] text-2xl font-semibold p-3 bg-gray-400 text-white rounded-2xl'>Change</button>
      <button className={`text-4xl font-bold text-center px-8 py-2 rounded-4xl ${gender=='Male'?'bg-blue-700':gender=='Female'?'bg-pink-600':'other'}`}>{gender}'s Washroom</button>
    </>
  )
}

export default App
