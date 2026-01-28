const BottomToolbar = () => {
    return (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl px-2 py-2 flex items-center gap-1 shadow-2xl">
            <button className="w-9 h-9 bg-[#0d99ff] rounded-lg flex items-center justify-center hover:bg-[#0088ee] transition-colors">
                <svg width="24" height="24" stroke="white" fill="none" viewBox="0 0 24 24" data-fpl-icon-size="24L"><path d="M4.586 4.586a2 2 0 0 1 2.005-.497l.14.05 13 5.107a2 2 0 0 1 1.267 1.779v.159a2 2 0 0 1-1.26 1.782l-.15.053-5.024 1.545-1.545 5.024a2 2 0 0 1-1.677 1.398l-.158.012a2 2 0 0 1-1.938-1.267l-5.107-13a2 2 0 0 1 .447-2.145m1.78.484a1 1 0 0 0-1.073.223l-.097.112a1 1 0 0 0-.127.96l5.108 13a1 1 0 0 0 .811.628l.158.006a1 1 0 0 0 .859-.558l.058-.147 1.7-5.53 5.531-1.701a1 1 0 0 0 .687-.76l.018-.157a1 1 0 0 0-.492-.9l-.142-.069z"></path></svg>
            </button>

            <div className="w-px h-6 bg-[#3a3a3a] mx-1" />
            <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#3a3a3a] transition-colors">
               <svg width="24" height="24" fill="none" viewBox="0 0 24 24" data-fpl-icon-size="24L"><path fill="white" fill-rule="evenodd" d="M7.5 4a.5.5 0 0 0-.5.5V7H4.5a.5.5 0 0 0 0 1H7v8H4.5a.5.5 0 0 0 0 1H7v2.5a.5.5 0 0 0 1 0V17h8v2.5a.5.5 0 0 0 1 0V17h2.5a.5.5 0 0 0 0-1H17V8h2.5a.5.5 0 0 0 0-1H17V4.5a.5.5 0 0 0-1 0V7H8V4.5a.5.5 0 0 0-.5-.5M16 8H8v8h8z" clip-rule="evenodd"></path></svg>
            </button>

            <div className="w-px h-6 bg-[#3a3a3a] mx-1" />
            <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#3a3a3a] transition-colors">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-gray-300">
                    <rect x="4" y="4" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <path d="M4 7L2 7M4 11L2 11M14 7L16 7M14 11L16 11M7 4L7 2M11 4L11 2M7 14L7 16M11 14L11 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </button>
            <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#3a3a3a] transition-colors">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-gray-300">
                    <path d="M3 15L6 12L12 6L15 3L12 6L6 12L3 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
                    <circle cx="3" cy="15" r="1.5" fill="currentColor" />
                </svg>
            </button>
            <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#3a3a3a] transition-colors">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-gray-300">
                    <path d="M5 4H13M9 4V14M7 14H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#3a3a3a] transition-colors">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-gray-300">
                    <path d="M9 3V9M9 9L13 7M9 9L5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="9" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
            </button>
            <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#3a3a3a] transition-colors">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-gray-300">
                    <path d="M3 4C3 3.44772 3.44772 3 4 3H14C14.5523 3 15 3.44772 15 4V11C15 11.5523 14.5523 12 14 12H7L3 15V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
                </svg>
            </button>

            <div className="w-px h-6 bg-[#3a3a3a] mx-1" />
            <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#3a3a3a] transition-colors">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-gray-300">
                    <rect x="6" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <rect x="6" y="11" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <path d="M9 7V11" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            </button>
            <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#3a3a3a] transition-colors">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-gray-300">
                    <path d="M6 6L3 9L6 12M12 6L15 9L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
}

export default BottomToolbar