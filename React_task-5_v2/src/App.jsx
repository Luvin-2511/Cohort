import wifi from '../src/assets/wifo.svg'
import bat from '../src/assets/bat.svg'
import Dialer from './Components/Dialer'
import key from '../src/assets/key.svg'
import rec from '../src/assets/rec.svg'
import cont from '../src/assets/cont.svg'
import { useRef, useState } from 'react'

const App = () => {
  const contactlist = useRef(null)
  const saver = useRef(null)
  const [num, setnum] = useState('')
  const [name, setname] = useState('')
  const [contact, setcontact] = useState([])
  const submitter = (e) => {
    e.preventDefault();
    setcontact([...contact, { name, num }])
    console.log(contact);
    saver.current.classList.add('hidden')
    setname('')
    setnum('')
  }
  return (
    <div className='h-[43rem] w-[25rem] relative overflow-hidden flex flex-col items-center border-2 border-white rounded-2xl'>
      <div className='h-[2rem] mt-[0.7rem] w-full px-[1rem] flex items-center justify-between'>
        <div className='font-semibold text-md'>
          12:02
        </div>
        <div className='flex items-center justify-center gap-2'>
          <img className='h-[1rem] object-cover invert-100' src={wifi} alt="" />
          <img className='h-[1.5rem] object-cover invert-100' src={bat} alt="" />
        </div>
      </div>
      <h1 className='mt-[5rem] text-5xl font-extralight '>+91 {num}</h1>
      <button onClick={() => {
        saver.current.classList.remove('hidden')
      }} className='mt-[0.5rem] text-blue-400 hover:text-blue-500 transition-all cursor-pointer'>Add Number</button>

      <div ref={saver} className='absolute hidden h-[60%] w-[80%] p-4 bg-[rgb(0,0,0,0.7)] backdrop-blur-[4px] top-[30%] z-40 rounded-xl'>
        <form onSubmit={(e) => {
          submitter(e);
        }} className='flex flex-col gap-7 items-center text-white justify-center gap-2'>

          <input required maxLength={10} value={name} onChange={(e) => {
            setname(e.target.value)
          }} className='text-2xl border-2 border-white p-2 rounded-xl placeholder:text-white' type="text" placeholder='Enter Name' />

          <button className='text-xl font-bold cursor-pointer hover:bg-blue-600 bg-blue-500 transition-all px-3 py-2 rounded-xl '>Add Contact</button>
        </form>
      </div>

      <div onClick={(e) => {
        if (e.target.classList.contains('dialer')) {
          if (num.length < 10) {
            setnum(num + e.target.innerText)
          }
        }

      }} className='h-96 w-full flex mt-[1rem] flex-wrap pl-[2rem] pr-[2rem] justify-around gap-[1rem]'>
        <Dialer num={1} />
        <Dialer num={2} />
        <Dialer num={3} />
        <Dialer num={4} />
        <Dialer num={5} />
        <Dialer num={6} />
        <Dialer num={7} />
        <Dialer num={8} />
        <Dialer num={9} />
        <Dialer num={0} />
      </div>

      <div className='h-[4rem] mt-[1rem] flex items-center justify-center gap-14 w-full '>
        <div onClick={()=>{
          contactlist.current.classList.add('hidden')

        }} className='flex flex-col items-center justify-center '>
          <img className='h-[2rem] px-2 invert-100 cursor-pointer hover:invert-50' src={key} alt="" />
          <h3>Keypad</h3>
        </div>
        <div onClick={()=>{
          contactlist.current.classList.remove('hidden')
          saver.current.classList.add('hidden')
        }} className='flex flex-col items-center justify-center '>
          <img className='h-[2rem] px-2 invert-100 cursor-pointer hover:invert-50' src={cont} alt="" />
          <h3>Contacts</h3>
        </div>
        <div className='flex flex-col items-center justify-center '>
          <img className='h-[2rem] px-2 invert-100 cursor-pointer hover:invert-50' src={rec} alt="" />
          <h3>Recent</h3>
        </div>
      </div>
      <div ref={contactlist} className='hidden absolute h-[90%] w-full bg-[rgb(0,0,0)] p-2 backdrop-blur-xl '>
        <h1 className='text-4xl font-bold text-center mt-2 mb-2'>Contacts</h1>
        <div className='h-[90%] overflow-y-scroll w-full p-2 flex flex-col items-start gap-2 pt-6'>
          {contact.map((elem)=>{
            return <div className='h-[5rem] w-[100%] p-2 pl-6 rounded-2xl  border-2 border-white'>
            <h1 className='text-2xl font-bold'>{elem.name}</h1>
            <h4 className='text-md text-gray-300'>{elem.num}</h4>
          </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default App
