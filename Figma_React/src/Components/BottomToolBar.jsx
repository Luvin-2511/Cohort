import React, { useContext, useEffect, useState } from "react";
import { canvasCon } from "../Context/CanvasContext";

const BottomToolbar = () => {
    const Tools = [
        {
            id: "cursor",
            svg: (
                <svg width="24" height="24" stroke="white" fill="none" viewBox="0 0 24 24">
                    <path d="M4.586 4.586a2 2 0 0 1 2.005-.497l.14.05 13 5.107a2 2 0 0 1 1.267 1.779v.159a2 2 0 0 1-1.26 1.782l-.15.053-5.024 1.545-1.545 5.024a2 2 0 0 1-1.677 1.398l-.158.012a2 2 0 0 1-1.938-1.267l-5.107-13a2 2 0 0 1 .447-2.145" />
                </svg>
            ),
        },
        {
            id: "frame",
            dividerAfter: true,
            svg: (
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24" data-fpl-icon-size="24L"><path fill="var(--fpl-icon-color, var(--color-icon))" fillRule="evenodd" d="M7.5 4a.5.5 0 0 0-.5.5V7H4.5a.5.5 0 0 0 0 1H7v8H4.5a.5.5 0 0 0 0 1H7v2.5a.5.5 0 0 0 1 0V17h8v2.5a.5.5 0 0 0 1 0V17h2.5a.5.5 0 0 0 0-1H17V8h2.5a.5.5 0 0 0 0-1H17V4.5a.5.5 0 0 0-1 0V7H8V4.5a.5.5 0 0 0-.5-.5M16 8H8v8h8z" clipRule="evenodd"></path></svg>
            ),
        },
        {
            id: "rectangle",
            svg: (
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24" data-fpl-icon-size="24"><path fill="var(--fpl-icon-color, var(--color-icon))" fillRule="evenodd" d="M16.5 7h-9a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5m-9-1A1.5 1.5 0 0 0 6 7.5v9A1.5 1.5 0 0 0 7.5 18h9a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 16.5 6z" clipRule="evenodd"></path></svg>
            ),
        },
        {
            id: "circle",
            svg: (
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24" data-fpl-icon-size="24"><path fill="var(--fpl-icon-color, var(--color-icon))" fillRule="evenodd" d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12m0 1a7 7 0 1 0 0-14 7 7 0 0 0 0 14" clipRule="evenodd"></path></svg>
            )
        },
        {
            id: "line",
            svg: (
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24" data-fpl-icon-size="24"><path fill="var(--fpl-icon-color, var(--color-icon))" fillRule="evenodd" d="M17.854 6.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0" clipRule="evenodd"></path></svg>
            ),
        },
        {
            id: "text",
            svg: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M5 4H13M9 4V14M7 14H11" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            ),
        },
        {
            id: "comment",
            dividerAfter: true,
            svg: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 4H14V12H7L3 15V4Z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            ),
        },
        {
            id: "layout",
            svg: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-gray-300">
                    <rect x="6" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <rect x="6" y="11" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <path d="M9 7V11" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            ),
        },
        {
            id: "code",
            svg: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-gray-300">
                    <path d="M6 6L3 9L6 12M12 6L15 9L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
    ];

    const { activeId, setActiveId } = useContext(canvasCon)

    const handlebottomBar = (e) => {
        const btn = e.target.closest('.bottom-btn')
        if (!btn) return
        setActiveId(btn.dataset.id);
    }

    return (
        <div onClick={handlebottomBar} className="cursor-none absolute z-9 bottom-6 left-1/2 -translate-x-1/2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl px-2 py-2 flex items-center gap-1 shadow-2xl">
            {
                Tools.map((tool, idx) => {
                    return (
                        <React.Fragment key={idx}>
                            <button data-id={tool.id} className={`${activeId ? "cursor-crosshair" : "cursor-none"} bottom-btn ${activeId === tool.id ? "bg-[#0d99ff]" : "hover:bg-[#3a3a3a]"} w-9 h-9 rounded-lg flex items-center justify-center transition-colors`}>
                                {tool.svg}
                            </button>
                            {tool.dividerAfter ? <div className="w-px h-6 bg-[#3a3a3a] mx-1" /> : <></>}
                        </React.Fragment>
                    )
                })
            }
        </div>
    );
}

export default BottomToolbar