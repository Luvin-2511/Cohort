import React from 'react'

const Card = (props) => {
  return (
    <div className='px-[2rem] py-[2rem] shrink-0 flex-3/12  w-fit rounded-2xl text-2xl font-bold border-2 border-black bg-[rgb(255,255,255,0.3)] backdrop-blur-2xl'>
      <h3>Name : {props.name}</h3>
      <h3>Age : {props.age}</h3>
    </div>
  )
}

export default Card
