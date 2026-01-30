import TopBar from './TopBar.jsx'
import BottomToolbar from './BottomToolBar.jsx';
import Cursor from './Cursor.jsx';
import { useContext, useEffect, useRef, useState } from 'react';
import { canvasCon } from '../Context/CanvasContext.jsx';

const MainCanvas = () => {
    const cursorRef = useRef(null)
    const canvasRef = useRef(null)
    const { selectedShape, setSelectedShape } = useContext(canvasCon)
    const { activeId, setActiveId } = useContext(canvasCon)
    // Rectangle Shape State
    const [rects, setRects] = useState([])
    const [rectId, setRectId] = useState(1)
    // Circle Shape State
    const [circs, setCircs] = useState([])
    const [circleId, setCircleId] = useState(1)
    // Line State
    const [line, setLine] = useState([])
    const [lineId, setLineId] = useState(1)


    const handleCursor = (e) => {
        if (!cursorRef.current) return
        const leftSpace = canvasRef.current.getBoundingClientRect()
        cursorRef.current.style.transform = `translate(${e.clientX - leftSpace.left}px,${e.clientY - leftSpace.top}px)`
    }

    const showCursor = () => {
        if (activeId === null) {
            cursorRef.current.style.opacity = 1
        }
    }

    const hideCursor = () => {
        cursorRef.current.style.opacity = 0
    }

    const ShapeCreator = (e) => {
        const bounds = canvasRef.current.getBoundingClientRect()
        const x = e.clientX - bounds.left
        const y = e.clientY - bounds.top
        // For rectangle shape
        if (activeId === 'rectangle') {
            setRects(prev => [...prev, {
                id: `rect${rectId}`,
                x: x,
                y: y
            }])
            setRectId(rectId + 1)
            setActiveId(null)
        }
        // For Circle Shape
        if (activeId === 'circle') {
            setCircs(prev => [...prev
                , {
                id: `circle${circleId}`,
                x: x,
                y: y,
            }
            ])
            setCircleId(circleId + 1)
            setActiveId(null)
        }
        // For Line
        if (activeId === 'line') {
            setLine(prev => [...prev, {
                id: `circle${lineId}`,
                x: x,
                y: y,
            }])
            setLineId(lineId + 1)
            setActiveId(null)
        }
    }



    return (
        <main
            onClick={ShapeCreator}
            ref={canvasRef}
            onMouseLeave={hideCursor}
            onMouseEnter={showCursor}
            onMouseMove={handleCursor}
            className="flex-1 cursor-none bg-[#1c1c1c] relative flex flex-col">
            <Cursor ref={cursorRef} />
            <TopBar />
            <div className={`${activeId ? "cursor-crosshair" : "cursor-none"} flex-1 flex items-center justify-center`}>
                <div className="w-full h-full bg-[#1e1e1e]" />
            </div>

            {rects.map((rect, idx) => {
                return <div
                    key={idx}
                    id={rect.id}
                    style={{
                        left: `${rect.x}px`,
                        top: `${rect.y}px`
                    }}
                    className="shape h-[100px] w-[100px] rounded translate-[-50%] bg-[#d9d9d9] absolute">
                </div>
            })}

            {circs.map((circ, idx) => {
                return (
                    <div
                        key={idx}
                        id={circ.id}
                        style={{
                            left: `${circ.x}px`,
                            top: `${circ.y}px`
                        }}
                        className="shape h-[100px] w-[100px] rounded-full rounded translate-[-50%] bg-[#d9d9d9] absolute">
                    </div>
                )
            })}

            {line.map((lin, idx) => {
                return (
                    <div
                        key={idx}
                        id={lin.id}
                        style={{
                            left: `${lin.x}px`,
                            top: `${lin.y}px`
                        }}
                        className="shape h-[4px] w-[100px] rounded translate-[-50%] bg-[#d9d9d9] absolute">
                    </div>
                )
            })}

            <BottomToolbar />
        </main>
    );
}

export default MainCanvas