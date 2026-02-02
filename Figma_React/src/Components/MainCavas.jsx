import TopBar from './TopBar.jsx'
import BottomToolbar from './BottomToolBar.jsx';
import Cursor from './Cursor.jsx';
import { useContext, useEffect, useRef, useState } from 'react';
import { canvasCon } from '../Context/CanvasContext.jsx';

const MainCanvas = () => {
    let handles = [
        {
            id: 'tl',
            left: -4,
            top: -4
        },
        {
            id: 'tr',
            right: -4,
            top: -4
        },
        {
            id: 'bl',
            left: -4,
            bottom: -4
        },
        {
            id: 'br',
            right: -4,
            bottom: -4
        },
    ]
    const cursorRef = useRef(null)
    const canvasRef = useRef(null)
    const { selectedShape, setSelectedShape, canvasColor, shapeProperty } = useContext(canvasCon)
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
    // Dragging & Resizing
    const [dragging, setDragging] = useState(false)
    const [resizing, setResizing] = useState(false)
    // Shape Drag Attribute
    const dragRef = useRef({
        shapeId: null,
        handle: null,
        startX: 0,
        startY: 0,
        startTop: 0,
        startLeft: 0,
        startW: 0,
        startH: 0
    })

    const handleCursor = (e) => {
        const leftSpace = canvasRef.current.getBoundingClientRect()
        cursorRef.current.style.transform = `translate(${e.clientX - leftSpace.left}px,${e.clientY - leftSpace.top}px)`
        if (!dragging && !resizing) return

        const bounder = canvasRef.current.getBoundingClientRect()
        const mouseX = e.clientX - bounder.left
        const mouseY = e.clientY - bounder.top
        const newx = mouseX - dragRef.current.startX
        const newy = mouseY - dragRef.current.startY
        if (dragging && !resizing) {
            setRects(prev =>
                prev.map(rect =>
                    rect.id === dragRef.current.shapeId
                        ? { ...rect, x: newx + dragRef.current.startLeft, y: newy + dragRef.current.startTop }
                        : rect
                )
            )
            setCircs(prev =>
                prev.map(circ =>
                    circ.id === dragRef.current.shapeId
                        ? { ...circ, x: newx + dragRef.current.startLeft, y: newy + dragRef.current.startTop }
                        : circ
                )
            )
        }

        if (resizing) {
            setRects(prev =>
                prev.map(rect => {
                    if (rect.id !== dragRef.current.shapeId) return rect
                    let { startW, startH, startLeft, startTop, handle } = dragRef.current
                    let x = startLeft
                    let y = startTop
                    let w = startW
                    let h = startH
                    if (handle === 'tl') {
                        w = w - newx
                        h = h - newy
                    }
                    if (handle === 'tr') {
                        w = w + newx
                        h = h - newy
                    }
                    if (handle === 'bl') {
                        w = w - newx
                        h = h + newy
                    }
                    if (handle === 'br') {
                        w = w + newx
                        h = h + newy
                    }
                    return { ...rect, x, y, w, h }
                })
            )

            setCircs(prev =>
                prev.map(circ => {
                    if (circ.id !== dragRef.current.shapeId) return circ
                    let { startW, startH, startLeft, startTop, handle } = dragRef.current
                    let x = startLeft
                    let y = startTop
                    let w = startW
                    let h = startH
                    if (handle === 'tl') {
                        w = w - newx
                        h = w
                    }
                    if (handle === 'tr') {
                        w = w + newx
                        h = w
                    }
                    if (handle === 'bl') {
                        w = w - newx
                        h = w
                    }
                    if (handle === 'br') {
                        w = w + newx
                        h = w
                    }
                    return { ...circ, x, y, w, h }
                })
            )
        }
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
        setSelectedShape(null)
        if (e.target.classList.contains('shape')) {
            setSelectedShape(e.target.id)
        }
        const bounds = canvasRef.current.getBoundingClientRect()
        const x = e.clientX - bounds.left
        const y = e.clientY - bounds.top
        // For rectangle shape
        if (activeId === 'rectangle') {
            setRects(prev => [...prev, {
                id: `rect${rectId}`,
                x: x,
                y: y,
            }])
            setRectId(rectId + 1)
            setActiveId(null)
            setSelectedShape(`rect${rectId}`)
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
            setSelectedShape(`circle${circleId}`)
        }
        // For Line
        if (activeId === 'line') {
            setLine(prev => [...prev, {
                id: `line${lineId}`,
                x: x,
                y: y,
            }])
            setLineId(lineId + 1)
            setActiveId(null)
            setSelectedShape(`line${lineId}`)
        }
    }

    const dragShaper = (e) => {
        const shape = e.target.closest('.shape')
        if (!shape) return
        const handle = e.target.closest('.handle')
        if (handle) setResizing(true)
        setDragging(true)
        const leftSpace = canvasRef.current.getBoundingClientRect()
        const rectBox = shape.getBoundingClientRect()
        const x = e.clientX - leftSpace.left
        const y = e.clientY - leftSpace.top

        const shapeData = rects.find(r => r.id === shape.id) || circs.find(c => c.id === shape.id)
        shapeProperty.current({
            x:shapeData.x,
            y:shapeData.y,
            rot:0,
            wid: rectBox.width,
            hgt: rectBox.height,
            opacity:1,
            bradius:1,
        })
        dragRef.current = {
            shapeId: shape.id,
            handle: handle ? handle.id : null,
            startX: x,
            startY: y,
            startTop: shapeData.y,
            startLeft: shapeData.x,
            startW: rectBox.width,
            startH: rectBox.height,
        }
    }

    const stopDrag = () => {
        setDragging(false)
        setResizing(false)
    }

    return (
        <main
            onClick={ShapeCreator}
            ref={canvasRef}
            onMouseLeave={hideCursor}
            onMouseEnter={showCursor}
            onMouseMove={handleCursor}
            onMouseDown={dragShaper}
            onMouseUp={stopDrag}
            className={`flex-1 cursor-none overflow-hidden relative flex flex-col`}>
            <Cursor ref={cursorRef} />
            <TopBar />
            <div
                className={`${activeId ? "cursor-crosshair" : "cursor-none"} flex-1 flex items-center justify-center`}
            >
                <div
                    style={{
                        backgroundColor: canvasColor
                    }}
                    className="w-full h-full" />
            </div>

            {rects.map((rect, idx) => {
                return (
                    <div
                        key={idx}
                        id={rect.id}
                        style={{
                            left: `${rect.x}px`,
                            top: `${rect.y}px`,
                            height: rect.h ?? 100,
                            width: rect.w ?? 100
                        }}
                        className={`shape hover:border-2  hover:border-blue-500 ${selectedShape === rect.id ? 'border-2 border-blue-500' : ''} rounded translate-[-50%] bg-[#d9d9d9] absolute`}
                    >
                        {
                            selectedShape === rect.id ?
                                <>
                                    {handles.map((handle) => {
                                        return (
                                            <div
                                                onMouseEnter={hideCursor}
                                                onMouseLeave={showCursor}
                                                key={handle.id}
                                                id={handle.id}
                                                className={`handle h-2 w-2 ${handle.id === 'tl' ? 'cursor-nw-resize' : ''} ${handle.id === 'br' ? 'cursor-se-resize' : ''} ${handle.id === 'tr' ? 'cursor-ne-resize' : ''} ${handle.id === 'bl' ? 'cursor-sw-resize' : ''} bg-white border-[1.5px] border-blue-500 absolute`}
                                                style={{
                                                    left: handle.left,
                                                    right: handle.right,
                                                    top: handle.top,
                                                    bottom: handle.bottom,
                                                }}
                                            >
                                            </div>)
                                    })}
                                </>
                                :
                                <>

                                </>
                        }
                    </div>
                )
            })}

            {circs.map((circ, idx) => {
                return (
                    <div
                        key={idx}
                        id={circ.id}
                        style={{
                            left: `${circ.x}px`,
                            top: `${circ.y}px`,
                            height: circ.h ?? 100,
                            width: circ.w ?? 100
                        }}
                        className={`shape h-[100px] w-[100px] hover:border-2 rounded-full ${selectedShape === circ.id ? 'border-2 border-blue-500' : ''} hover:border-blue-500 rounded translate-[-50%] bg-[#d9d9d9] absolute`}>
                        {
                            selectedShape === circ.id ?
                                <>
                                    {handles.map((handle) => {
                                        return (
                                            <div
                                                onMouseEnter={hideCursor}
                                                onMouseLeave={showCursor}
                                                key={handle.id}
                                                id={handle.id}
                                                className={`handle h-2 w-2 ${handle.id === 'tl' ? 'cursor-nw-resize' : ''} ${handle.id === 'br' ? 'cursor-se-resize' : ''} ${handle.id === 'tr' ? 'cursor-ne-resize' : ''} ${handle.id === 'bl' ? 'cursor-sw-resize' : ''} bg-white border-[2px] border-blue-500 absolute`}
                                                style={{
                                                    left: handle.left,
                                                    right: handle.right,
                                                    top: handle.top,
                                                    bottom: handle.bottom,
                                                }}
                                            >
                                            </div>)
                                    })}
                                </>
                                :
                                <>

                                </>
                        }
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