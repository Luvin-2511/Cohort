import React, { useState } from 'react'

const App = () => {
  const [users, setusers] = useState([])
  const [name, setname] = useState('')
  const [email, setemail] = useState('')

  const submitHandler = (e) => {
    e.preventDefault();
    // const newuser = [...users]
    // newuser.push(name)
    // setusers(newuser)
    // Another way of doing it
    setusers([...users, {name,email}])
    setname('')
    setemail('')
  }

  return (
    <div>
      <form onSubmit={(e) => {
        submitHandler(e)
      }}
        className='flex m-[2rem] gap-[2rem]'>
        <input
        required
          value={name}
          onChange={(e) => {
            setname(e.target.value)
          }}
          className='border-2 px-4 py-2 rounded-xl text-6xl' type="text" placeholder='Enter Name' />
        <input
        required
          value={email}
          onChange={(e) => {
            setemail(e.target.value)
          }}
          className='border-2 px-4 py-2 rounded-xl text-6xl' type="email" placeholder='Enter Email' />
        <button className='cursor-pointer active:scale-95 px-5 py-1 bg-blue-500 text-white font-bold rounded-xl text-6xl'>Submit</button>
      </form>
      {users.map((elem) => {
        return <h1 className='text-9xl font-semibold ml-[2rem]'>{elem.name},{elem.email}</h1>
      })}
    </div>
  )
}

export default App
