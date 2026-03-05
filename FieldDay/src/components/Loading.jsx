import React, {useEffect, useRef, useState} from 'react'

const Loading = ({setLoading,style}) => {
    const [count, setCount] = useState(0)
    const intervalRef = useRef(null)

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCount(prevState => {
                if (prevState>=100){
                    setLoading(false)
                    clearInterval(intervalRef.current)
                    return 100
                }

                const increment = prevState<80?Math.floor(Math.random()*6)+1:Math.floor(Math.random()*12)+3
                return Math.min(prevState+increment,100)
            })
        }, 60)

        return () => {
            clearInterval(intervalRef.current)
        }
    }, []);

    return (
        <>
            <div className="loader-wrapper" style={style}>
                <div className="loader">
                    <h1 className="left-tagline">WE ARE A CREATIVE SOUND AND MUSIC COMPANY.</h1>
                    <div className="right-side">
                        <div className="load-count">{count}</div>
                        <div className="loading-text">Loading</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Loading
