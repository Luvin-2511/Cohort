import TopBar from './TopBar.jsx'
import BottomToolbar from './BottomToolbar.jsx'
import Cursor from './Cursor.jsx';
import { useRef } from 'react';

const MainCanvas = () => {
    const cursorRef = useRef(null)
    const canvasRef = useRef(null)

    const handleCursor = (e) => {
        if (!cursorRef.current) return
        const leftSpace = canvasRef.current.getBoundingClientRect()
        cursorRef.current.style.transform = `translate(${e.clientX - leftSpace.left}px,${e.clientY - leftSpace.top}px)`
    }

    const showCursor = () => {
        cursorRef.current.style.opacity = 1
    }

    const hideCursor = () => {
        cursorRef.current.style.opacity = 0
    }

    return (
        <main
            ref={canvasRef}
            onMouseLeave={hideCursor}
            onMouseEnter={showCursor}
            onMouseMove={handleCursor}
            className="flex-1 cursor-none bg-[#1c1c1c] relative flex flex-col">
            <Cursor ref={cursorRef} />
            <TopBar />
            <div className="flex-1 flex items-center justify-center">
                <div className="w-full h-full bg-[#1e1e1e]" />
            </div>
            <BottomToolbar />
        </main>
    );
}

export default MainCanvas