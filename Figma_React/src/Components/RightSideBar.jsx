const RightSidebar = () => {
    return (
        <aside className="w-64 bg-[#242424] border-l border-[#2f2f2f] flex flex-col">

      <div className="h-12 px-4 border-b border-[#2f2f2f] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="text-xs font-medium text-gray-200">Design</button>
          <button className="text-xs text-gray-500">Prototype</button>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400">100%</span>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-gray-500">
            <path d="M4 6L1 3L7 3L4 6Z" fill="currentColor" />
          </svg>
        </div>
      </div>

      <div className="p-4 space-y-4 text-xs">
        <div>
          <div className="text-gray-400 mb-2 font-medium">Page</div>
          <div className="flex items-center justify-between bg-[#2a2a2a] px-3 py-2 rounded">
            <span className="font-mono">#1E1E1E</span>
            <div className="flex items-center gap-2">
              <span>100</span>
              <span className="text-gray-500">%</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gray-500">
                <circle cx="6" cy="6" r="2" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-gray-400 py-2">
          <span className="font-medium">Variables</span>
          <button className="hover:text-gray-200">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 2V10M2 6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between text-gray-400 py-2">
          <span className="font-medium">Styles</span>
          <button className="hover:text-gray-200">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 2V10M2 6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between text-gray-400 py-2">
          <span className="font-medium">Export</span>
          <button className="hover:text-gray-200">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 2V10M2 6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-auto p-4">
        <button className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#3a3a3a] transition-colors ml-auto">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-400">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M8 11V11.5M8 5C6.89543 5 6 5.89543 6 7C6 7.5 6.5 8 7 8H8C8.5 8 9 8.5 9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </aside>
    );
}

export default RightSidebar