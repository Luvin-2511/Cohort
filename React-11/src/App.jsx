import React, { useState } from 'react'
import Card from './Components/Card'

const App = () => {
  const [name, setname] = useState('')
  const [profile, setprofile] = useState('')
  const [bg, setbg] = useState('')
  const [desc, setdesc] = useState('')
  const [likes, setlikes] = useState('')
  const [views, setviews] = useState('')
  const [posts, setposts] = useState('')


  const localData = (JSON.parse(localStorage.getItem('all-users'))) || []
  const [users, setusers] = useState(localData)


  const deleter = (index) => {
    let copyUser = [...users]
    copyUser.splice(index, 1)
    setusers(copyUser)
    localStorage.setItem('all-users', JSON.stringify(copyUser))
  }

  const submitter = (e) => {
    e.preventDefault()
    let oldusers = [...users]
    oldusers.push({ name, profile, bg, desc, likes, views, posts })
    setusers((oldusers))
    localStorage.setItem('all-users', JSON.stringify(oldusers))
    setname('')
    setbg('')
    setprofile('')
    setdesc('')
    setviews('')
    setlikes('')
    setposts('')
  }

  return (
    <div className='min-h-screen lg:flex-row flex flex-col items-center pt-8 justify-center gap-8 bg-black text-white'>
      <form onSubmit={(e) => {
        submitter(e)
      }}
        className='flex w-1/4 flex-col items-center justify-center gap-8'>
        <input value={name}
          onChange={(e) => {
            setname(e.target.value)
          }}
          className='py-4 placeholder:text-white placeholder:font-light px-8 w-[22rem] text-2xl border-[1px] border-gray-500 rounded-xl'
          type="text"
          placeholder='Enter Name' />
        <input value={profile}
          onChange={(e) => {
            setprofile(e.target.value)
          }}
          className='py-4 placeholder:text-white placeholder:font-light px-8 w-[22rem] text-2xl border-[1px] border-gray-500 rounded-xl'
          type="text"
          placeholder='Enter Profile URL' />
        <input value={bg}
          onChange={(e) => {
            setbg(e.target.value)
          }}
          className='py-4 placeholder:text-white placeholder:font-light px-8 w-[22rem] text-2xl border-[1px] border-gray-500 rounded-xl'
          type="text"
          placeholder='Enter Bg-Image URL' />
        <input value={desc}
          onChange={(e) => {
            setdesc(e.target.value)
          }}
          className='py-4 placeholder:text-white placeholder:font-light px-8 w-[22rem] text-2xl border-[1px] border-gray-500 rounded-xl'
          type="text"
          placeholder='Enter Description' />
        <input value={likes}
          onChange={(e) => {
            setlikes(e.target.value)
          }}
          className='py-4 placeholder:text-white placeholder:font-light px-8 w-[22rem] text-2xl border-[1px] border-gray-500 rounded-xl'
          type="text"
          placeholder='Enter Likes' />
        <input value={views}
          onChange={(e) => {
            setviews(e.target.value)
          }}
          className='py-4 placeholder:text-white placeholder:font-light px-8 w-[22rem] text-2xl border-[1px] border-gray-500 rounded-xl'
          type="text"
          placeholder='Enter Views' />
        <input value={posts}
          onChange={(e) => {
            setposts(e.target.value)
          }}
          className='py-4 placeholder:text-white placeholder:font-light px-8 w-[22rem] text-2xl border-[1px] border-gray-500 rounded-xl'
          type="text"
          placeholder='Enter Posts' />
        <button className='py-4 px-8 w-[22rem] text-2xl bg-emerald-600 hover:bg-emerald-700 transition-all active:scale-95 cursor-pointer rounded-xl'>Submit</button>
      </form>
      {
        users.length > 0 ?
          <div className='p-4 flex flex-col lg:flex-row gap-4 items-center justify-center border-[1px] border-gray-400 h-full mb-8 rounded-xl'>
            {users.map((elem, idx) => {
              return <Card key={idx} idx={idx} elem={elem} deleter={deleter} />
            })}
          </div>
          : <></>
      }

    </div>
  )
}

export default App
