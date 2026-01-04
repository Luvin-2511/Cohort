import React from 'react'
import { useParams } from 'react-router-dom'

const Anyproject = () => {
    const params = useParams()
    console.log(params);
    
  return (
     <div className='text-center'>
      <h1 className='font-bold uppercase'>{params.anyproject} Project PAGE</h1>
    </div>
  )
}

export default Anyproject
