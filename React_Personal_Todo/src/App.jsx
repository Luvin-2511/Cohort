import React, { useState } from 'react'

const App = () => {
  const localdata = JSON.parse(localStorage.getItem('all-tasks')) || []
  const [alltask, setalltask] = useState(localdata)
  const [task, settask] = useState('')
  const submitter = (e) => {
    e.preventDefault()
    let oldtasks =[...alltask]
    oldtasks.push({ task, isCompleted: false })
    setalltask(oldtasks)
    localStorage.setItem('all-tasks',JSON.stringify(oldtasks))
    settask('')
  }
  
  const deleter = (idx) => {
    let copytasks = [...alltask]
    copytasks.splice(idx, 1)
    localStorage.setItem('all-tasks',JSON.stringify(copytasks))
    setalltask(copytasks)
  }
  
  const editor = (idx) => {
    settask(alltask[idx].task)
    deleter(idx)
  }
  
  const toggleComplete = (idx) => {
    const updated = setalltask(alltask.map((e, i) => 
      i === idx ? { ...e, isCompleted: !e.isCompleted } : e
  ))
  setalltask(updated)
  localStorage.setItem('all-tasks',JSON.stringify(updated))
    
  }

  return (
    <div className='h-screen w-full p-4 bg-black text-white'>
      <form onSubmit={(e) => {
        submitter(e)
      }} className='flex pt-6 items-center gap-2 justify-center w-full'>
        <input
          style={{
            borderColor: '#BE2DFE', boxShadow: "0 2px 6px rgba(0,0,0,0.35)"
          }}
          value={task}
          onChange={(e) => {
            settask(e.target.value)
          }}
          className='text-2xl lg:w-1/3 border-2 placeholder:text-gray-500 border-gray-600 px-3 py-2 rounded-2xl' type="text" placeholder='What’s today’s quest?' />
        <button style={{ boxShadow: '0px 4px 12px rgb(0,0,0,0.4)' }} className='bg-[#BE2DFE] px-4 py-[0.8rem] active:scale-95 hover:animate-pulse cursor-pointer rounded-2xl shadow-2xl'>Add Task</button>
      </form>

      <div className='conta h-1/2 lg:w-1/3 flex flex-col m-4 bg-[#161327] rounded-3xl p-3 '>
        <h1 className='text-5xl font-bold text-center mt-1.5'>TASKS</h1>
        <h4 className='text-center text-gray-400'>{alltask.length} Active • Today</h4>
        <hr className='w-full' />
        {alltask.map((elem, idx) => {
          return <div  className='relative overflow-hidden insider border-[0.2px] cursor-pointer flex justify-between hover:scale-[1.02] transition-all items-center px-4 py-2 rounded-xl mt-2 border-gray-400'>
            <div className='relative z-10 flex items-center  gap-4'>
              <input onChange={() => { toggleComplete(idx) }} className='hidden' type="checkbox" checked={elem.isCompleted} name="tracker" id={`tracker-${idx}`} />
              <label className='h-[2rem] w-[2rem] rounded-full bg-gray-600 flex items-center justify-center' htmlFor={`tracker-${idx}`}>
                {elem.isCompleted == true ? <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-white invert-100 font-bold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg> : <></>}

              </label>
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
