import React, {useRef, useState} from 'react'
import Text from "./components/Text.jsx";
import {heroText} from "./json/heroText.js";
import Loading from './components/Loading.jsx'

const App = () => {
    const cursorRef = useRef();
    const [hovered, setHovered] = useState(false)
    const [videoSrc, setVideoSrc] = useState(null)
    const [loading, setLoading] = useState(true)

    const handleMouseMove = (e) => {
        cursorRef.current.style.transform = `translate(${e.clientX}px,${e.clientY}px)`
    }

    return (
        <>
            <Loading style={{
                transform: loading ? 'translateY(0)' : 'translateY(-100%)',
                transition: 'transform 0.5s ease'
            }} setLoading={setLoading}/>
            <main onMouseMove={handleMouseMove}>
                <div ref={cursorRef} className="custom-cursor"></div>
                <div
                    style={{
                        transform: hovered ? "scale(1)" : "scale(1.6)",
                        opacity: hovered ? "1" : "0",
                    }}
                    className="video-wrapper">
                    <video autoPlay={hovered} muted={true} loop src={videoSrc}/>
                </div>
                <nav>
                    <div className="logo-wrapper">
                        <img className="logo" src="https://www.fielddaysound.tv/_nuxt/logo.78817b08.svg"
                             alt=""/>
                    </div>
                </nav>
                <div className="text-wrapper">
                    <div className="text-liner">
                        {heroText.map((item) => {
                            return (
                                <>
                                    <Text setHovered={setHovered} hovered={hovered} setVideoSrc={setVideoSrc}
                                          video={item.video}
                                          text={item.text}/>
                                </>
                            )
                        })}
                    </div>
                    <div className="text-liner">
                        {heroText.map((item) => {
                            return (
                                <>
                                    <Text setHovered={setHovered} setVideoSrc={setVideoSrc} text={item.text}
                                          video={item.video}/>
                                </>
                            )
                        })}
                    </div>
                </div>
            </main>
        </>
    )
}
export default App
