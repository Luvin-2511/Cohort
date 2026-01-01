import React, { useState } from 'react'

const App = () => {
  const [alltask, setalltask] = useState([])
  const [task, settask] = useState()
  const [isCompleted, setisCompleted] = useState(false)
  const submitter = (e) => {
    e.preventDefault()
    setalltask([...alltask, { task, isCompleted }])
    console.log(alltask);
    settask('')
  }

  const deleter = (idx) => {
    let copytasks = [...alltask]
    copytasks.splice(idx, 1)
    setalltask(copytasks)
  }

  const editor = (idx) => {
    settask(alltask[idx].task)
    deleter(idx)
  }

  return (
    <div className='h-screen w-full p-4 bg-black text-white'>
      <form onSubmit={(e) => {
        submitter(e)
      }} className='flex pt-6 items-center gap-2 justify-center w-full'>
        <input
          style={{
            borderColor: '#c77dff', boxShadow: "0 2px 6px rgba(0,0,0,0.35)"
          }}
          value={task}
          onChange={(e) => {
            settask(e.target.value)
          }}
          className='text-2xl lg:w-1/3 border-2 placeholder:text-gray-500 border-gray-600 px-3 py-2 rounded-2xl' type="text" placeholder='What’s today’s quest?' />
        <button style={{ boxShadow: '0px 4px 12px rgb(0,0,0,0.4)' }} className='bg-[#c77dff] px-4 py-[0.8rem] active:scale-95 hover:animate-pulse cursor-pointer rounded-2xl shadow-2xl'>Add Task</button>
      </form>

      <div className='conta h-1/2 lg:w-1/3 flex flex-col m-4 bg-[#161327] rounded-3xl p-3 '>
        <h1 className='text-5xl font-bold text-center mt-1.5'>TASKS</h1>
        <h4 className='text-center text-gray-400'>{alltask.length} Active • Today</h4>
        <hr className='w-full' />
        {alltask.map((elem, idx) => {
          return <div onClick={() => {
            if (elem.isCompleted == false) {
              elem.isCompleted = true
            } else {
              elem.isCompleted = false
            }
            console.log(elem.isCompleted);
          }} className='relative overflow-hidden insider border-[0.2px] cursor-pointer flex justify-between hover:scale-[1.02] transition-all items-center px-4 py-2 rounded-xl mt-2 border-gray-400'>
            <div className='relative z-10 flex items-center  gap-4'>
              <h3 className=' text-sm font-semibold text-gray-500'>{idx + 1}</h3>
              {elem.isCompleted === false 
              ? <h3 className='text-xl font-semibold'>{elem.task}</h3> 
              : <h3 className=' text-xl line-through font-semibold'>{elem.task}</h3>}
            </div>
            <div className='relative z-10 flex gap-2'>
              <button onClick={() => {
                editor(idx)
              }} className='p-2'>Edit</button>
              <button onClick={() => {
                deleter(idx)
              }} className='bg-red-600 hover:bg-red-800 cursor-pointer transition-all px-2 py-2 rounded-xl'>Delete</button>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default App
