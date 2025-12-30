import React from 'react'
import Upper from './Upper'

const Card = (props) => {
  return (
    <div>
      <Upper user={props.user}/>
    </div>
  )
}

export default Card
