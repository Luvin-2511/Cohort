import React, { useState } from 'react'

const Sample = (props) => {

    const [newmode, setnewmode] = useState('')
    
  return (
    <div>
        <form onSubmit={(e)=>{
            e.preventDefault()
            setnewmode('')
            props.changemode(newmode)
        }}>
            <input 
            value={newmode}
            onChange={(e)=>{
                setnewmode(e.target.value)
            }}
            type="text" placeholder='Enter your mode' />
            <button>Submit</button>
        </form>
    </div>
  )
}

export default Sample
