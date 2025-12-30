import React from 'react'

const UpperLower = (props) => {
  return (
    <div>
        <h1>This user went from App.jsx to Card.jsx to Upper.jsx to UpperLower.jsx</h1>
      <h1>{props.user}</h1>
    </div>
  )
}

export default UpperLower
