import axios from 'axios'
import React, { useEffect, useState } from 'react'

const App = () => {
  const [tasks, settasks] = useState([])

  const caller = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
    settasks(response.data)
  }

  return (
    <div className='min-h-screen px-4 flex flex-col pt-12 items-center justify-start bg-black text-white'>
      <button onClick={() => {
        caller()
      }} className='text-3xl font-bold rounded active:scale-95 cursor-pointer px-4 py-2 bg-emerald-600'>Click Me MF</button>
      <div className='min-h-full bg-black flex-wrap w-full flex gap-5 p-4 m-6 border-2 border-white rounded-2xl'>
        {tasks.map((elem, idx) => {
          let col1 = Math.floor(Math.random() * 255)
          let col2 = Math.floor(Math.random() * 255)
          let col3 = Math.floor(Math.random() * 255)
          return <div key={idx} style={{ backgroundColor: `rgb(${col1},${col2},${col3})` }} className='flex hover:scale-105 transition-all h-fit w-[49%] rounded-2xl p-6 bg-red-500 items-center'>
            <h4 className='text-xl font-bold'>{elem.id}</h4>
            <h1 className={`text-3xl ${elem.completed ? 'line-through' : ''} font-bold`}>{elem.title}</h1>
          </div>
        })}
      </div>
    </div>
  )
}

export default App
