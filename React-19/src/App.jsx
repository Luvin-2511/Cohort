import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from './slices/counter.slice'

const App = () => {
  const dispatch = useDispatch()
  const count = useSelector((state)=>state.counter.value)
  return (
    <div>
      {count}
      <button onClick={()=>{
        dispatch(increment())
      }}>Increment</button>
    </div>
  )
}

export default App
