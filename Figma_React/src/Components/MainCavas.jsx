import TopBar from './TopBar.jsx'
import BottomToolbar from './BottomToolbar.jsx'

const MainCanvas = () => {
    return (
        <main className="flex-1 bg-[#1c1c1c] relative flex flex-col">
            <TopBar />
            <div className="flex-1 flex items-center justify-center">
                <div className="w-full h-full bg-[#1e1e1e]" />
            </div>
            <BottomToolbar />
        </main>
    );
}

export default MainCanvas