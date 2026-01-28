

const TopBar = () => {
    return (
        <div className="h-12 w-full bg-[#242424] border-b border-[#2f2f2f] flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-orange-500">
          <path d="M4 4L16 16M4 16L16 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-gray-500">
          <path d="M4 6L1 3L7 3L4 6Z" fill="currentColor" />
        </svg>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-xs font-medium text-gray-200">Design</button>
        <button className="text-xs text-gray-500">Prototype</button>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400">100%</span>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-gray-500">
            <path d="M4 6L1 3L7 3L4 6Z" fill="currentColor" />
          </svg>
        </div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-500">
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <button className="bg-[#0d99ff] hover:bg-[#0088ee] text-white text-xs font-medium px-3 py-1.5 rounded">
          Share
        </button>
      </div>
    </div>
    );
}

export default TopBar