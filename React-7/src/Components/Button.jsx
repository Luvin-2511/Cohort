import React from 'react'

const Button = (props) => {
    const clicked = () => {
        console.log("Clicked")
    }
    return (
        <div>
            <button
                onClick={() => {
                    clicked()
                }}
                className='ml-[45%]  cursor-pointer active:scale-95 bg-green-500 text-white font-bold rounded text-2xl px-[1rem] py-[0.4rem]'>
                {props.text}
            </button>
        </div>
    )
}

export default Button
