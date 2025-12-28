import React, { useState } from 'react'

const App = () => {
  const [users, setusers] = useState([])
  const [num, setnum] = useState()
  const [name, setname] = useState('')
  const submitter = (e) => {
    e.preventDefault()
    setusers([...users, { num, name }])
    setname('')
    setnum('')
  }
  return (
    <div className='h-[40rem] w-[25rem] border-2 border-white rounded-2xl'>
      <form
        onSubmit={(e) => {
          submitter(e)
        }}
        className='flex flex-col items-center gap-4 p-4'>
        <input required value={num} onChange={(e) => {
          if(e.target.value.length<=10){
            setnum(e.target.value)
          }
        }}
          className='text-2xl border-2 px-[1rem] py-[0.5rem] w-[100%] border-white rounded-lg' type="number" placeholder='Enter Your Number' />
        <input required value={name} onChange={(e) => {
          setname(e.target.value)
        }}
          className='text-2xl border-2 px-[1rem] py-[0.5rem] w-[100%] border-white rounded-lg' type="text" placeholder='Enter Name' />
        <button className='active:scale-95 active:bg-green-600 active:text-white px-[1rem] py-[0.4rem] hover:bg-gray-400 transition-all cursor-pointer bg-gray-200 w-fit rounded-lg text-black text-2xl'>Add Contact</button>
      </form>
      <h1 className='text-center text-2xl font-bold'>Contact List</h1>
      <div className='h-[61%] w-[95%] ml-3 border-2 overflow-y-scroll border-white rounded-xl'>
        <div className='flex flex-col items-start overflow-x-hidden '>
          {users.map((elem) => {
            return <div className='border-2 border-white w-[96%] rounded-xl p-2 m-2'>
              <h2 className='text-2xl font-bold'>{elem.name}</h2>
              <h4 className='text-md font-medium text-gray-400'>+91 {elem.num}</h4>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default App
