const LeftSidebar = () => {
    return (
        <aside className="w-52 bg-[#242424] border-r border-[#2f2f2f] flex flex-col">
            <div className="h-12 flex items-center justify-between px-3 border-b border-[#2f2f2f]">
                <div className="flex items-center gap-2">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" data-fpl-icon-size="24L"><path fill="white" fill-rule="evenodd" d="M7 7c0 1.043.533 1.963 1.341 2.5A3 3 0 0 0 7 12c0 1.043.533 1.963 1.341 2.5A3 3 0 1 0 13 17v-2.764A3 3 0 1 0 16.659 9.5 3 3 0 0 0 15 4h-5a3 3 0 0 0-3 3m8 2a2 2 0 1 0 0-4h-2v4zm-2 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0m-1 2h-2a2 2 0 1 1 0-4h2zm-2 1h2v2a2 2 0 1 1-2-2m2-6h-2a2 2 0 1 1 0-4h2z" clip-rule="evenodd"></path></svg>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-gray-500">
                        <path d="M4 6L1 3L7 3L4 6Z" fill="currentColor" />
                    </svg>
                </div>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" data-fpl-icon-size="24"><path fill="white" fill-rule="evenodd" d="M10 7h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-8zM9 7H6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3zM4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" clip-rule="evenodd"></path></svg>
            </div>
            <div className="px-4 py-3 border-b border-[#2f2f2f]">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Untitled</span>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-gray-500">
                        <path d="M4 6L1 3L7 3L4 6Z" fill="currentColor" />
                    </svg>
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">Drafts</span>
                    <span className="text-xs text-gray-500">·</span>
                    <span className="text-xs text-blue-400">Free</span>
                </div>
            </div>
            <div className="flex items-center border-b border-[#2f2f2f]">
                <button className="flex-1 px-4 py-2 text-xs text-gray-200 border-b-2 border-gray-200">
                    File
                </button>
                <button className="flex-1 px-4 py-2 text-xs text-gray-500">
                    Assets
                </button>
                <button className="px-3 py-2 text-gray-500">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                        <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </button>
            </div>
            <div className="flex-1 overflow-y-auto">
                <div className="px-4 py-3 flex items-center justify-between text-xs">
                    <span className="font-medium">Pages</span>
                    <button className="text-gray-400 hover:text-gray-200">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M6 2V10M2 6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
                <div className="px-2">
                    <div className="px-3 py-2 rounded bg-[#2f2f2f] text-xs font-medium">Page 1</div>
                </div>

                <div className="px-4 py-3 mt-4 text-xs font-medium text-gray-400">Layers</div>
            </div>
        </aside>
    );
}

export default LeftSidebar