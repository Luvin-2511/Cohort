import React from 'react'

const Text = ({text, setVideoSrc, setHovered, hovered,video}) => {
    let newText = text.split("")
    return (
        <div onMouseEnter={() => {
            setHovered(true)
            setVideoSrc(video)
        }}
             onMouseLeave={() => {
                 setHovered(false)
                 setTimeout(()=>{
                     setVideoSrc(null)
                 },1000)
             }}
             className="revolving-text-wrapper">
            <h1 className="revolving-text">
                {
                    newText.map((letter) => {
                        return (
                            <span className="revolving-broken-text">
                    {letter}
                    </span>
                        )
                    })}
            </h1>
        </div>
    )
}
export default Text
