import React, {useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import useAuth from "../../Auth/Hooks/useAuth.jsx";

const Sidebar = ({creatoropen, setcreatoropen}) => {
    const navigate = useNavigate()
    const [searchOpen, setSearchOpen] = useState(false)
    const [file, setFile] = useState(null)
    const [text, setText] = useState("")
    const [moreOpen, setMoreOpen] = useState(false)
    const [metaOpen, setMetaOpen] = useState(false)
    const [msgOpen, setMsgOpen] = useState(false)
    const [svgToggle, setSvgToggle] = useState(false)
    const [metaToggle, setMetaToggle] = useState(false)
    const {handleLogout} = useAuth()

    const loc = useLocation().pathname

    const loadFile = (event) => {
        const uploadedFile = event.target.files[0]
        if (uploadedFile) {
            setFile(uploadedFile)
            const output = document.getElementById('output')
            output.src = URL.createObjectURL(uploadedFile)
            output.onload = () => URL.revokeObjectURL(output.src)
        }
    }

    const handleSearchToggle = () => {
        setSearchOpen(prev => !prev)
    }

    const handleMoreToggle = () => {
        setMoreOpen(prev => !prev)
        setSvgToggle(prev => !prev)
    }

    const handleMetaToggle = () => {
        setMetaOpen(prev => !prev)
        setMetaToggle(prev => !prev)
    }

    const isCreatorOpen = creatoropen

    return (
        <div>
            {/* Post Creator Modal */}
            <div
                className={`absolute ${isCreatorOpen ? "flex" : "hidden"} h-full w-full bg-[#000000ab] z-20 items-center justify-center`}>
                <div
                    onClick={() => setcreatoropen(false)}
                    className="cross absolute top-[1vw] right-[2vw] cursor-pointer text-white"
                >
                    <svg aria-label="Close" fill="white" height="18" role="img" viewBox="0 0 24 24" width="18">
                        <title>Close</title>
                        <polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor"
                                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline>
                        <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                              strokeWidth="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line>
                    </svg>
                </div>
                <div className="cont h-[80vh] w-[39vw] bg-[#262626] overflow-hidden rounded-2xl">
                    <div
                        className="h-3vw w-full bg-black text-[1vw] font-[500] py-[0.3vw] text-white text-center">Create
                        new Post
                    </div>
                    <div
                        className="h-[70vh] flex flex-col items-center justify-center text-white text-xl font-[400] gap-[0.5vw]">
                        {!file && (
                            <div className='flex flex-col items-center justify-center text-white gap-[0.5vw]'>
                                <svg aria-label="Icon to represent media such as images or videos" className='mt-[2vw]'
                                     fill="white" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><title>Icon
                                    to represent media such as images or videos</title>
                                    <path
                                        d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                                        fill="currentColor"></path>
                                    <path
                                        d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                                        fill="currentColor"></path>
                                    <path
                                        d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                                        fill="currentColor"></path>
                                </svg>
                                <h1>Drag photos and videos here</h1>
                            </div>
                        )}
                        <img className={`${file ? "h-[15vw]" : ""}`} id="output" alt=""/>
                        <label
                            className="mt-[0.7vw] cursor-pointer hover:bg-[#4150F7] bg-[#4A5DF9] py-[0.4vw] px-[0.8vw] text-sm font-semibold rounded-lg">
                            <span
                                className="mt-2 text-base leading-normal">{file ? "Change File" : "Upload File"}</span>
                            <input type="file" className="hidden" accept="image/*" onChange={loadFile}/>
                        </label>
                        {file && (
                            <div className='flex flex-col items-center justify-center'>
                                <input
                                    type="text"
                                    className='h-[4vw] w-full placeholder:text-center focus:outline-none bg-transparent text-white'
                                    placeholder='Write Caption...'
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                                {text.trim() !== "" && (
                                    <button
                                        className="py-[0.4vw] transition-all px-[0.8vw] text-sm text-white rounded-lg hover:bg-[#4150F7] bg-[#4A5DF9]">
                                        Post
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Floating Messages Button — hidden on mobile */}
            <div
                onClick={() => setMsgOpen(true)}
                className="message hidden md:flex fixed bottom-[2vw] bg-[#212328] w-[15.5vw] h-[3.5vw] rounded-4xl px-[1vw] right-[3%] gap-[0.6vw] text-white items-center font-bold cursor-pointer hover:bg-[#38393E]"
            >
                <svg aria-label="Messages" fill="white" height="24" role="img" viewBox="0 0 24 24" width="24">
                    <title>Messages</title>
                    <path
                        d="M13.973 20.046 21.77 6.928C22.8 5.195 21.55 3 19.535 3H4.466C2.138 3 .984 5.825 2.646 7.456l4.842 4.752 1.723 7.121c.548 2.266 3.571 2.721 4.762.717Z"
                        fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                    <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          x1="7.488" x2="15.515" y1="12.208" y2="7.641"></line>
                </svg>
                Messages
            </div>

            {/* ===================== DESKTOP SIDEBAR (md+) — full with text labels ===================== */}
            <div
                className={`hidden md:flex fixed transition-all ${searchOpen ? "-left-[100vw]" : "left-0"} w-[14.5%] h-full border-r-[1px] border-r-gray-800 flex-col`}>
                <div className="logo relative left-[0.7vw] bottom-[0.5vw]">
                    <Link to='/'>
                        <img className="h-[7.6vw] hover:cursor-pointer" alt="" src="./src/ins1.webp"/>
                    </Link>
                </div>
                <div className="wrapper flex flex-col items-center relative bottom-[1.5vw] text-white">

                    {/* Home */}
                    <Link to='/'>
                        <div
                            className={`home flex ${loc === '/' ? "font-bold" : "font-semilight"} items-center gap-[1vw] rounded-lg h-[3vw] w-[13vw] mb-[0.3vw] hover:cursor-pointer hover:bg-[#1A1A1A]`}>
                            {loc === '/' ? (
                                <svg className='ml-[0.85vw]' aria-label="Home" fill="white" height="24" role="img"
                                     viewBox="0 0 24 24" width="24"><title>Home</title>
                                    <path
                                        d="m21.762 8.786-7-6.68a3.994 3.994 0 0 0-5.524 0l-7 6.681A4.017 4.017 0 0 0 1 11.68V19c0 2.206 1.794 4 4 4h3.005a1 1 0 0 0 1-1v-7.003a2.997 2.997 0 0 1 5.994 0V22a1 1 0 0 0 1 1H19c2.206 0 4-1.794 4-4v-7.32a4.02 4.02 0 0 0-1.238-2.894Z"></path>
                                </svg>
                            ) : (
                                <svg aria-label="Home" className='ml-[0.85vw]' fill="white" height="24" role="img"
                                     viewBox="0 0 24 24" width="24"><title>Home</title>
                                    <path
                                        d="m21.762 8.786-7-6.68C13.266.68 10.734.68 9.238 2.106l-7 6.681A4.017 4.017 0 0 0 1 11.68V20c0 1.654 1.346 3 3 3h5.005a1 1 0 0 0 1-1L10 15c0-1.103.897-2 2-2 1.09 0 1.98.877 2 1.962L13.999 22a1 1 0 0 0 1 1H20c1.654 0 3-1.346 3-3v-8.32a4.021 4.021 0 0 0-1.238-2.894ZM21 20a1 1 0 0 1-1 1h-4.001L16 15c0-2.206-1.794-4-4-4s-4 1.794-4 4l.005 6H4a1 1 0 0 1-1-1v-8.32c0-.543.226-1.07.62-1.447l7-6.68c.747-.714 2.013-.714 2.76 0l7 6.68c.394.376.62.904.62 1.448V20Z"></path>
                                </svg>
                            )}
                            Home
                        </div>
                    </Link>

                    {/* Search */}
                    <div onClick={handleSearchToggle}
                         className="home flex items-center gap-[1vw] rounded-lg h-[3vw] w-[13vw] mb-[0.3vw] hover:cursor-pointer hover:bg-[#1A1A1A]">
                        <svg className='ml-[0.85vw]' aria-label="Search" fill="white" height="24" role="img"
                             viewBox="0 0 24 24" width="24"><title>Search</title>
                            <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none"
                                  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="2"></path>
                            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line>
                        </svg>
                        Search
                    </div>

                    {/* Explore */}
                    <div
                        className="home flex items-center gap-[1vw] rounded-lg h-[3vw] w-[13vw] mb-[0.3vw] hover:cursor-pointer hover:bg-[#1A1A1A]">
                        <svg aria-label="Explore" className='ml-[0.85vw]' fill="white" height="24" role="img"
                             viewBox="0 0 24 24" width="24"><title>Explore</title>
                            <polygon fill="none"
                                     points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"
                                     stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                     strokeWidth="2"></polygon>
                            <polygon fillRule="evenodd"
                                     points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon>
                            <circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor"
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
                        </svg>
                        Explore
                    </div>

                    {/* Reels */}
                    <div
                        className="home flex items-center gap-[1vw] rounded-lg h-[3vw] w-[13vw] mb-[0.3vw] hover:cursor-pointer hover:bg-[#1A1A1A]">
                        <svg aria-label="Reels" className='ml-[0.85vw]' fill="white" height="24" role="img"
                             viewBox="0 0 24 24" width="24"><title>Reels</title>
                            <path
                                d="M22.935 7.468c-.063-1.36-.307-2.142-.512-2.67a5.341 5.341 0 0 0-1.27-1.95 5.345 5.345 0 0 0-1.95-1.27c-.53-.206-1.311-.45-2.672-.513C15.333 1.012 14.976 1 12 1s-3.333.012-4.532.065c-1.36.063-2.142.307-2.67.512-.77.298-1.371.69-1.95 1.27a5.36 5.36 0 0 0-1.27 1.95c-.206.53-.45 1.311-.513 2.672C1.012 8.667 1 9.024 1 12s.012 3.333.065 4.532c.063 1.36.307 2.142.512 2.67.297.77.69 1.372 1.27 1.95.58.581 1.181.974 1.95 1.27.53.206 1.311.45 2.672.513C8.667 22.988 9.024 23 12 23s3.333-.012 4.532-.065c1.36-.063 2.142-.307 2.67-.512a5.33 5.33 0 0 0 1.95-1.27 5.356 5.356 0 0 0 1.27-1.95c.206-.53.45-1.311.513-2.672.053-1.198.065-1.555.065-4.531s-.012-3.333-.065-4.532Zm-1.998 8.972c-.05 1.07-.228 1.652-.38 2.04-.197.51-.434.874-.82 1.258a3.362 3.362 0 0 1-1.258.82c-.387.151-.97.33-2.038.379-1.162.052-1.51.063-4.441.063s-3.28-.01-4.44-.063c-1.07-.05-1.652-.228-2.04-.38a3.354 3.354 0 0 1-1.258-.82 3.362 3.362 0 0 1-.82-1.258c-.151-.387-.33-.97-.379-2.038C3.011 15.28 3 14.931 3 12s.01-3.28.063-4.44c.05-1.07.228-1.652.38-2.04.197-.51.434-.875.82-1.26a3.372 3.372 0 0 1 1.258-.819c.387-.15.97-.329 2.038-.378C8.72 3.011 9.069 3 12 3s3.28.01 4.44.063c1.07.05 1.652.228 2.04.38.51.197.874.433 1.258.82.385.382.622.747.82 1.258.151.387.33.97.379 2.038C20.989 8.72 21 9.069 21 12s-.01 3.28-.063 4.44Zm-4.584-6.828-5.25-3a2.725 2.725 0 0 0-2.745.01A2.722 2.722 0 0 0 6.988 9v6c0 .992.512 1.88 1.37 2.379.432.25.906.376 1.38.376.468 0 .937-.123 1.365-.367l5.25-3c.868-.496 1.385-1.389 1.385-2.388s-.517-1.892-1.385-2.388Zm-.993 3.04-5.25 3a.74.74 0 0 1-.748-.003.74.74 0 0 1-.374-.649V9a.74.74 0 0 1 .374-.65.737.737 0 0 1 .748-.002l5.25 3c.341.196.378.521.378.652s-.037.456-.378.651Z"></path>
                        </svg>
                        Reels
                    </div>

                    {/* Messages */}
                    <div
                        className="home flex items-center gap-[1vw] rounded-lg h-[3vw] w-[13vw] mb-[0.3vw] hover:cursor-pointer hover:bg-[#1A1A1A]">
                        <svg aria-label="Messages" className='ml-[0.85vw]' fill="white" height="24" role="img"
                             viewBox="0 0 24 24" width="24"><title>Messages</title>
                            <path
                                d="M13.973 20.046 21.77 6.928C22.8 5.195 21.55 3 19.535 3H4.466C2.138 3 .984 5.825 2.646 7.456l4.842 4.752 1.723 7.121c.548 2.266 3.571 2.721 4.762.717Z"
                                fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="2" x1="7.488" x2="15.515" y1="12.208" y2="7.641"></line>
                        </svg>
                        Messages
                    </div>

                    {/* Notifications */}
                    <div
                        className="home flex items-center gap-[1vw] rounded-lg h-[3vw] w-[13vw] mb-[0.3vw] hover:cursor-pointer hover:bg-[#1A1A1A]">
                        <svg aria-label="Notifications" className='ml-[0.85vw]' fill="white" height="24" role="img"
                             viewBox="0 0 24 24" width="24"><title>Notifications</title>
                            <path
                                d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                        </svg>
                        Notifications
                    </div>

                    {/* Create */}
                    <div
                        onClick={() => {
                            navigate('/create-post')
                            setcreatoropen(true)
                        }}
                        className="home flex items-center gap-[1vw] rounded-lg h-[3vw] w-[13vw] mb-[0.3vw] hover:cursor-pointer hover:bg-[#1A1A1A]">
                        <svg aria-label="New post" className='ml-[0.85vw]' fill="white" height="24" role="img"
                             viewBox="0 0 24 24" width="24"><title>New post</title>
                            <path
                                d="M21 11h-8V3a1 1 0 1 0-2 0v8H3a1 1 0 1 0 0 2h8v8a1 1 0 1 0 2 0v-8h8a1 1 0 1 0 0-2Z"></path>
                        </svg>
                        Create
                    </div>

                    {/* Profile */}
                    <Link to='/profile'>
                        <div
                            className={`home flex ${loc === '/profile' ? "font-bold" : "font-semilight"} items-center gap-[1vw] rounded-lg h-[3vw] w-[13vw] mb-[0.3vw] hover:cursor-pointer hover:bg-[#1A1A1A]`}>
                            <div
                                className={`ml-[0.85vw] bg-white ${loc === '/profile' ? "border-2 border-white" : ""} overflow-hidden h-[1.5vw] w-[1.5vw] rounded-full`}>
                                <img className="h-full w-full object-cover"
                                     src="https://imgs.search.brave.com/ZKYDA1AnTDG4bikMzyAShVXD1wBPxfe_F8kNuvgLC98/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvMzQ5/Nzc3Ni5qcGc"
                                     alt=""/>
                            </div>
                            Profile
                        </div>
                    </Link>

                    {/* More */}
                    <div
                        onClick={handleMoreToggle}
                        className={`home relative top-[13vw] flex items-center gap-[1vw] rounded-lg h-[3vw] w-[13vw] mb-[0.3vw] hover:cursor-pointer hover:bg-[#1A1A1A] ${moreOpen ? "font-[700]" : "font-[400]"}`}
                    >
                        {svgToggle ? (
                            <svg aria-label="Settings" className='ml-[0.85vw]' fill="white" height="24" role="img"
                                 viewBox="0 0 24 24" width="24"><title>Settings</title>
                                <path
                                    d="M3.5 6.5h17a1.5 1.5 0 0 0 0-3h-17a1.5 1.5 0 0 0 0 3Zm17 4h-17a1.5 1.5 0 0 0 0 3h17a1.5 1.5 0 0 0 0-3Zm0 7h-17a1.5 1.5 0 0 0 0 3h17a1.5 1.5 0 0 0 0-3Z"></path>
                            </svg>
                        ) : (
                            <svg aria-label="Settings" className='ml-[0.85vw]' fill="white" height="24" role="img"
                                 viewBox="0 0 24 24" width="24"><title>Settings</title>
                                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2" x1="3" x2="21" y1="4" y2="4"></line>
                                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2" x1="3" x2="21" y1="12" y2="12"></line>
                                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2" x1="3" x2="21" y1="20" y2="20"></line>
                            </svg>
                        )}
                        More
                        {moreOpen && (
                            <div
                                className="extra absolute pt-[0.5vw] pl-[0.5vw] bg-[#262626] h-[23.5vw] w-[16vw] rounded-2xl bottom-[3.4vw]">
                                <div
                                    className="items w-[96%] rounded-lg flex items-center gap-[0.7vw] font-[400] text-[0.9vw] hover:bg-[#3C3C3C] h-[2.9vw]">
                                    <svg aria-label="Settings" className='ml-[0.8vw]' fill="white" height="18"
                                         role="img" viewBox="0 0 24 24" width="18"><title>Settings</title>
                                        <circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor"
                                                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
                                        <path
                                            d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096"
                                            fill="none" stroke="currentColor" strokeLinejoin="round"
                                            strokeWidth="2"></path>
                                    </svg>
                                    Settings
                                </div>
                                <div
                                    className="items w-[96%] rounded-lg flex items-center gap-[0.7vw] font-[400] text-[0.9vw] hover:bg-[#3C3C3C] h-[2.9vw]">
                                    <svg aria-label="Your activity" className='ml-[0.8vw]' fill="white" height="18"
                                         role="img" viewBox="0 0 24 24" width="18"><title>Your activity</title>
                                        <path
                                            d="M19 1H5C2.794 1 1 2.794 1 5v14c0 2.206 1.794 4 4 4h14c2.206 0 4-1.794 4-4V5c0-2.206-1.794-4-4-4ZM5 3h14c1.103 0 2 .897 2 2v6h-2.382l-2.723-5.447c-.34-.678-1.45-.678-1.79 0L9 15.764l-2.105-4.211A1 1 0 0 0 6 11H3V5c0-1.103.897-2 2-2Zm14 18H5c-1.103 0-2-.897-2-2v-6h2.382l2.723 5.447a1 1 0 0 0 1.79 0L15 8.236l2.105 4.211A1 1 0 0 0 18 13h3v6c0 1.103-.897 2-2 2Z"></path>
                                    </svg>
                                    Your activity
                                </div>
                                <div
                                    className="items w-[96%] rounded-lg flex items-center gap-[0.7vw] font-[400] text-[0.9vw] hover:bg-[#3C3C3C] h-[2.9vw]">
                                    <svg aria-label="Saved" className='ml-[0.8vw]' fill="white" height="18" role="img"
                                         viewBox="0 0 24 24" width="18"><title>Saved</title>
                                        <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                                                 stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                 strokeWidth="2"></polygon>
                                    </svg>
                                    Saved
                                </div>
                                <div
                                    className="items w-[96%] rounded-lg flex items-center gap-[0.7vw] font-[400] text-[0.9vw] hover:bg-[#3C3C3C] h-[2.9vw]">
                                    <svg aria-label="Theme icon" className='ml-[0.8vw]' fill="white" height="18"
                                         role="img" viewBox="0 0 24 24" width="18"><title>Theme icon</title>
                                        <path
                                            d="M11.502,22.99805A11.4313,11.4313,0,0,1,.49512,14.83691a.99889.99889,0,0,1,.251-.998,1.01148,1.01148,0,0,1,.99707-.249,9.43041,9.43041,0,0,0,2.75879.40821A9.5082,9.5082,0,0,0,13.5957,1.74023a1.00039,1.00039,0,0,1,1.24707-1.248A11.501,11.501,0,0,1,11.502,22.99805ZM3.08984,15.91211A9.49991,9.49991,0,0,0,21.002,11.498,9.57875,9.57875,0,0,0,15.916,3.08594,11.5083,11.5083,0,0,1,3.08984,15.91211Z"></path>
                                    </svg>
                                    Switch appearance
                                </div>
                                <div
                                    className="items w-[96%] rounded-lg flex items-center gap-[0.7vw] font-[400] text-[0.9vw] hover:bg-[#3C3C3C] h-[2.9vw]">
                                    <svg aria-label="Report a problem" className='ml-[0.8vw]' fill="white" height="18"
                                         role="img" viewBox="0 0 24 24" width="18"><title>Report a problem</title>
                                        <path
                                            d="M18.001 1h-12a5.006 5.006 0 0 0-5 5v9.005a5.006 5.006 0 0 0 5 5h2.514l2.789 2.712a1 1 0 0 0 1.394 0l2.787-2.712h2.516a5.006 5.006 0 0 0 5-5V6a5.006 5.006 0 0 0-5-5Zm3 14.005a3.003 3.003 0 0 1-3 3h-2.936a1 1 0 0 0-.79.387l-2.274 2.212-2.276-2.212a1 1 0 0 0-.79-.387H6a3.003 3.003 0 0 1-3-3V6a3.003 3.003 0 0 1 3-3h12a3.003 3.003 0 0 1 3 3Zm-9-1.66a1.229 1.229 0 1 0 1.228 1.228A1.23 1.23 0 0 0 12 13.344Zm0-8.117a1.274 1.274 0 0 0-.933.396 1.108 1.108 0 0 0-.3.838l.347 4.861a.892.892 0 0 0 1.77 0l.348-4.86a1.106 1.106 0 0 0-.3-.838A1.272 1.272 0 0 0 12 5.228Z"></path>
                                    </svg>
                                    Report a problem
                                </div>
                                <div
                                    className="bg-[#ffffff16] h-[0.3vw] top-[0.5vw] w-[16vw] relative right-[0.5vw]"></div>
                                <div
                                    className="items w-[96%] rounded-lg flex items-center mt-[1vw] gap-[0.7vw] font-[400] text-[0.9vw] hover:bg-[#3C3C3C] h-[2.9vw]">
                                    <h4 className='ml-[0.8vw]'>Switch accounts</h4>
                                </div>
                                <div
                                    className="bg-[#ffffff16] h-[0.1vw] top-[0.5vw] w-[16vw] relative right-[0.5vw]"></div>
                                <div
                                    onClick={() => {
                                        const success = handleLogout()
                                        if (success) {
                                            navigate('/login')
                                        }
                                    }}
                                    className="items w-[96%] relative bottom-[0.1vw] rounded-lg flex items-center mt-[1vw] gap-[0.7vw] font-[400] text-[0.9vw] hover:bg-[#3C3C3C] h-[2.9vw]">
                                    <h4 className='ml-[0.8vw]'>Log out</h4>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Also from Meta */}
                    <div
                        onClick={handleMetaToggle}
                        className={`home relative top-[13vw] flex items-center gap-[1vw] rounded-lg h-[3vw] w-[13vw] mb-[0.3vw] hover:cursor-pointer hover:bg-[#1A1A1A] ${metaOpen ? "font-[700]" : "font-[400]"}`}
                    >
                        {metaToggle ? (
                            <svg aria-label="Also from Meta" className='ml-[0.85vw]' fill="white" height="24" role="img"
                                 viewBox="0 0 24 24" width="24"><title>Also from Meta</title>
                                <path
                                    d="M14.5 11h-5A2.503 2.503 0 0 1 7 8.5v-5C7 2.122 8.121 1 9.5 1h5C15.879 1 17 2.122 17 3.5v5c0 1.378-1.121 2.5-2.5 2.5ZM8.499 23h-5a2.503 2.503 0 0 1-2.5-2.5v-5c0-1.378 1.12-2.5 2.5-2.5h5c1.379 0 2.5 1.122 2.5 2.5v5c0 1.378-1.121 2.5-2.5 2.5Zm12 0h-5a2.503 2.503 0 0 1-2.5-2.5v-5c0-1.378 1.12-2.5 2.5-2.5h5c1.379 0 2.5 1.122 2.5 2.5v5c0 1.378-1.121 2.5-2.5 2.5Z"></path>
                            </svg>
                        ) : (
                            <svg aria-label="Also from Meta" className='ml-[0.85vw]' fill="white" height="24" role="img"
                                 viewBox="0 0 24 24" width="24"><title>Also from Meta</title>
                                <path
                                    d="M9.5 11h5c1.379 0 2.5-1.122 2.5-2.5v-5C17 2.122 15.879 1 14.5 1h-5A2.503 2.503 0 0 0 7 3.5v5C7 9.878 8.12 11 9.5 11ZM9 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-5ZM8.499 13h-5a2.503 2.503 0 0 0-2.5 2.5v5c0 1.378 1.12 2.5 2.5 2.5h5c1.379 0 2.5-1.122 2.5-2.5v-5c0-1.378-1.121-2.5-2.5-2.5Zm.5 7.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5Zm11.5-7.5h-5a2.503 2.503 0 0 0-2.5 2.5v5c0 1.378 1.12 2.5 2.5 2.5h5c1.379 0 2.5-1.122 2.5-2.5v-5c0-1.378-1.121-2.5-2.5-2.5Zm.5 7.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5Z"></path>
                            </svg>
                        )}
                        Also from Meta
                        {metaOpen && (
                            <div
                                className="extra absolute pt-[0.4vw] pl-[0.5vw] bg-[#262626] h-[7.5vw] w-[16vw] rounded-2xl bottom-[3.4vw]">
                                <div
                                    className="items w-[96%] rounded-lg flex items-center gap-[0.9vw] font-[400] text-[1vw] hover:bg-[#3C3C3C] h-[3.3vw]">
                                    <svg aria-label="" className='ml-[0.85vw]' fill="white" height="24" role="img"
                                         viewBox="0 0 24 24" width="24"><title></title>
                                        <path
                                            d="M12,4c4.4184,0,8,3.5816,8,8,0,4.4176-3.5816,8-8,8s-8-3.5824-8-8c0-4.4184,3.5816-8,8-8M12,1C5.93458,1,1,5.93458,1,12s4.93458,11,11,11,11-4.93458,11-11S18.06542,1,12,1h0Z"></path>
                                    </svg>
                                    Meta AI
                                </div>
                                <div
                                    className="items w-[96%] rounded-lg flex items-center gap-[0.9vw] font-[400] text-[1vw] hover:bg-[#3C3C3C] h-[3.3vw]">
                                    <svg aria-label="" className='ml-[0.85vw]' fill="white" height="24" role="img"
                                         viewBox="0 0 192 192" width="24"><title></title>
                                        <path
                                            d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"></path>
                                    </svg>
                                    Threads
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ===================== MOBILE SIDEBAR (< md) — icons only, always visible ===================== */}
            <div
                className="fixed top-0 left-0 h-full flex flex-col md:hidden z-10 bg-black border-r-[1px] border-r-gray-800"
                style={{ width: '5rem', minWidth: '5rem', marginRight: '0rem' }}
            >
                <Link to='/'>
                    <div
                        className="shortlogo h-12 w-12 rounded-lg flex items-center justify-center transition-all hover:bg-[#1A1A1A] mx-auto mt-4">
                        <svg aria-label="Instagram" className='h-6 w-6' fill="white" height="24"
                             role="img" viewBox="0 0 24 24" width="24"><title>Instagram</title>
                            <path
                                d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1Zm0 5.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351Zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667Zm5.872-10.859a1.32 1.32 0 1 0 1.32 1.32 1.32 1.32 0 0 0-1.32-1.32Z"></path>
                        </svg>
                    </div>
                </Link>
                <div className="icons mt-6 flex flex-col items-center gap-2">
                    <Link to='/'>
                        <div className="p-3 rounded-lg hover:bg-[#1A1A1A] transition-all cursor-pointer">
                            <svg aria-label="Home" className='h-6 w-6' fill="white" height="24" role="img"
                                 viewBox="0 0 24 24" width="24"><title>Home</title>
                                <path
                                    d="m21.762 8.786-7-6.68C13.266.68 10.734.68 9.238 2.106l-7 6.681A4.017 4.017 0 0 0 1 11.68V20c0 1.654 1.346 3 3 3h5.005a1 1 0 0 0 1-1L10 15c0-1.103.897-2 2-2 1.09 0 1.98.877 2 1.962L13.999 22a1 1 0 0 0 1 1H20c1.654 0 3-1.346 3-3v-8.32a4.021 4.021 0 0 0-1.238-2.894ZM21 20a1 1 0 0 1-1 1h-4.001L16 15c0-2.206-1.794-4-4-4s-4 1.794-4 4l.005 6H4a1 1 0 0 1-1-1v-8.32c0-.543.226-1.07.62-1.447l7-6.68c.747-.714 2.013-.714 2.76 0l7 6.68c.394.376.62.904.62 1.448V20Z"></path>
                            </svg>
                        </div>
                    </Link>
                    <div onClick={handleSearchToggle}
                         className={`p-3 rounded-lg ${searchOpen ? "bg-[#1A1A1A]" : "hover:bg-[#1A1A1A]"} transition-all cursor-pointer`}>
                        <svg aria-label="Search" className='h-6 w-6' fill="white" height="24" role="img"
                             viewBox="0 0 24 24" width="24"><title>Search</title>
                            <path d="M18.5 10.5a8 8 0 1 1-8-8 8 8 0 0 1 8 8Z" fill="none" stroke="white"
                                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                            <line fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="3" x1="16.511" x2="21.643" y1="16.511" y2="21.643"></line>
                        </svg>
                    </div>
                    <div className="p-3 rounded-lg hover:bg-[#1A1A1A] transition-all cursor-pointer">
                        <svg aria-label="Explore" className='h-6 w-6' fill="white" height="24" role="img"
                             viewBox="0 0 24 24" width="24"><title>Explore</title>
                            <polygon fill="none"
                                     points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"
                                     stroke="white" strokeLinecap="round" strokeLinejoin="round"
                                     strokeWidth="2"></polygon>
                            <polygon fillRule="evenodd"
                                     points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon>
                            <circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="white" strokeLinecap="round"
                                    strokeLinejoin="round" strokeWidth="2"></circle>
                        </svg>
                    </div>
                    <div className="p-3 rounded-lg hover:bg-[#1A1A1A] transition-all cursor-pointer">
                        <svg aria-label="Reels" className='h-6 w-6' fill="white" height="24" role="img"
                             viewBox="0 0 24 24" width="24"><title>Reels</title>
                            <path
                                d="M22.935 7.468c-.063-1.36-.307-2.142-.512-2.67a5.341 5.341 0 0 0-1.27-1.95 5.345 5.345 0 0 0-1.95-1.27c-.53-.206-1.311-.45-2.672-.513C15.333 1.012 14.976 1 12 1s-3.333.012-4.532.065c-1.36.063-2.142.307-2.67.512-.77.298-1.371.69-1.95 1.27a5.36 5.36 0 0 0-1.27 1.95c-.206.53-.45 1.311-.513 2.672C1.012 8.667 1 9.024 1 12s.012 3.333.065 4.532c.063 1.36.307 2.142.512 2.67.297.77.69 1.372 1.27 1.95.58.581 1.181.974 1.95 1.27.53.206 1.311.45 2.672.513C8.667 22.988 9.024 23 12 23s3.333-.012 4.532-.065c1.36-.063 2.142-.307 2.67-.512a5.33 5.33 0 0 0 1.95-1.27 5.356 5.356 0 0 0 1.27-1.95c.206-.53.45-1.311.513-2.672.053-1.198.065-1.555.065-4.531s-.012-3.333-.065-4.532Zm-1.998 8.972c-.05 1.07-.228 1.652-.38 2.04-.197.51-.434.874-.82 1.258a3.362 3.362 0 0 1-1.258.82c-.387.151-.97.33-2.038.379-1.162.052-1.51.063-4.441.063s-3.28-.01-4.44-.063c-1.07-.05-1.652-.228-2.04-.38a3.354 3.354 0 0 1-1.258-.82 3.362 3.362 0 0 1-.82-1.258c-.151-.387-.33-.97-.379-2.038C3.011 15.28 3 14.931 3 12s.01-3.28.063-4.44c.05-1.07.228-1.652.38-2.04.197-.51.434-.875.82-1.26a3.372 3.372 0 0 1 1.258-.819c.387-.15.97-.329 2.038-.378C8.72 3.011 9.069 3 12 3s3.28.01 4.44.063c1.07.05 1.652.228 2.04.38.51.197.874.433 1.258.82.385.382.622.747.82 1.258.151.387.33.97.379 2.038C20.989 8.72 21 9.069 21 12s-.01 3.28-.063 4.44Zm-4.584-6.828-5.25-3a2.725 2.725 0 0 0-2.745.01A2.722 2.722 0 0 0 6.988 9v6c0 .992.512 1.88 1.37 2.379.432.25.906.376 1.38.376.468 0 .937-.123 1.365-.367l5.25-3c.868-.496 1.385-1.389 1.385-2.388s-.517-1.892-1.385-2.388Zm-.993 3.04-5.25 3a.74.74 0 0 1-.748-.003.74.74 0 0 1-.374-.649V9a.74.74 0 0 1 .374-.65.737.737 0 0 1 .748-.002l5.25 3c.341.196.378.521.378.652s-.037.456-.378.651Z"></path>
                        </svg>
                    </div>
                    <div className="p-3 rounded-lg hover:bg-[#1A1A1A] transition-all cursor-pointer">
                        <svg aria-label="Messages" className='h-6 w-6' fill="white" height="24" role="img"
                             viewBox="0 0 24 24" width="24"><title>Messages</title>
                            <path
                                d="M13.973 20.046 21.77 6.928C22.8 5.195 21.55 3 19.535 3H4.466C2.138 3 .984 5.825 2.646 7.456l4.842 4.752 1.723 7.121c.548 2.266 3.571 2.721 4.762.717Z"
                                fill="none" stroke="white" strokeLinejoin="round" strokeWidth="2"></path>
                            <line fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="2" x1="7.488" x2="15.515" y1="12.208" y2="7.641"></line>
                        </svg>
                    </div>
                    <div className="p-3 rounded-lg hover:bg-[#1A1A1A] transition-all cursor-pointer">
                        <svg aria-label="Notifications" className='h-6 w-6' fill="white" height="24"
                             role="img" viewBox="0 0 24 24" width="24"><title>Notifications</title>
                            <path
                                d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                        </svg>
                    </div>
                    <div
                        onClick={() => { navigate('/create-post'); setcreatoropen(true) }}
                        className="p-3 rounded-lg hover:bg-[#1A1A1A] transition-all cursor-pointer">
                        <svg aria-label="New post" className='h-6 w-6' fill="white" height="24" role="img"
                             viewBox="0 0 24 24" width="24"><title>New post</title>
                            <path
                                d="M21 11h-8V3a1 1 0 1 0-2 0v8H3a1 1 0 1 0 0 2h8v8a1 1 0 1 0 2 0v-8h8a1 1 0 1 0 0-2Z"></path>
                        </svg>
                    </div>
                    <Link to='/profile'>
                        <div className="p-3 rounded-lg hover:cursor-pointer hover:bg-[#1A1A1A]">
                            <div
                                className={`bg-white ${loc === '/profile' ? "border-2 border-white" : ""} overflow-hidden h-6 w-6 rounded-full`}>
                                <img className="h-full w-full object-cover"
                                     src="https://imgs.search.brave.com/ZKYDA1AnTDG4bikMzyAShVXD1wBPxfe_F8kNuvgLC98/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvMzQ5/Nzc3Ni5qcGc"
                                     alt=""/>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* ===================== DESKTOP icon-only sidebar (shown when search is open on md+) ===================== */}
            <div
                className={`transition-all hidden md:flex ${searchOpen ? "scale-100" : "scale-0"} fixed w-[4vw] h-full flex-col`}>
                <Link to='/'>
                    <div
                        className="shortlogo h-[3vw] w-[3vw] rounded-lg flex items-center justify-between transition-all hover:bg-[#1A1A1A] ml-[0.5vw] mt-[1.1vw]">
                        <svg aria-label="Instagram" className='h-[1.5vw] w-[1.5vw] ml-[0.7vw]' fill="white" height="24"
                             role="img" viewBox="0 0 24 24" width="24"><title>Instagram</title>
                            <path
                                d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1Zm0 5.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351Zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667Zm5.872-10.859a1.32 1.32 0 1 0 1.32 1.32 1.32 1.32 0 0 0-1.32-1.32Z"></path>
                        </svg>
                    </div>
                </Link>
                <div className="icons h-[73vw] flex flex-col items-center gap-[0.5vw]">
                    <div className="icon p-[0.7vw] rounded-lg hover:bg-[#1A1A1A] transition-all cursor-pointer">
                        <svg aria-label="Home" className='h-[1.5vw] w-[1.5vw]' fill="white" height="24" role="img"
                             viewBox="0 0 24 24" width="24"><title>Home</title>
                            <path
                                d="m21.762 8.786-7-6.68C13.266.68 10.734.68 9.238 2.106l-7 6.681A4.017 4.017 0 0 0 1 11.68V20c0 1.654 1.346 3 3 3h5.005a1 1 0 0 0 1-1L10 15c0-1.103.897-2 2-2 1.09 0 1.98.877 2 1.962L13.999 22a1 1 0 0 0 1 1H20c1.654 0 3-1.346 3-3v-8.32a4.021 4.021 0 0 0-1.238-2.894ZM21 20a1 1 0 0 1-1 1h-4.001L16 15c0-2.206-1.794-4-4-4s-4 1.794-4 4l.005 6H4a1 1 0 0 1-1-1v-8.32c0-.543.226-1.07.62-1.447l7-6.68c.747-.714 2.013-.714 2.76 0l7 6.68c.394.376.62.904.62 1.448V20Z"></path>
                        </svg>
                    </div>
                    <div onClick={handleSearchToggle}
                         className="icon p-[0.7vw] rounded-lg bg-[#1A1A1A] transition-all cursor-pointer">
                        <svg aria-label="Search" className='h-[1.5vw] w-[1.5vw]' fill="white" height="24" role="img"
                             viewBox="0 0 24 24" width="24"><title>Search</title>
                            <path d="M18.5 10.5a8 8 0 1 1-8-8 8 8 0 0 1 8 8Z" fill="none" stroke="white"
                                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                            <line fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="3" x1="16.511" x2="21.643" y1="16.511" y2="21.643"></line>
                        </svg>
                    </div>
                    <div className="icon p-[0.7vw] rounded-lg hover:bg-[#1A1A1A] transition-all cursor-pointer">
                        <svg aria-label="Explore" className='h-[1.5vw] w-[1.5vw]' fill="white" height="24" role="img"
                             viewBox="0 0 24 24" width="24"><title>Explore</title>
                            <polygon fill="none"
                                     points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"
                                     stroke="white" strokeLinecap="round" strokeLinejoin="round"
                                     strokeWidth="2"></polygon>
                            <polygon fillRule="evenodd"
                                     points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon>
                            <circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="white" strokeLinecap="round"
                                    strokeLinejoin="round" strokeWidth="2"></circle>
                        </svg>
                    </div>
                    <div className="icon p-[0.7vw] rounded-lg hover:bg-[#1A1A1A] transition-all cursor-pointer">
                        <svg aria-label="Reels" className='h-[1.5vw] w-[1.5vw]' fill="white" height="24" role="img"
                             viewBox="0 0 24 24" width="24"><title>Reels</title>
                            <path
                                d="M22.935 7.468c-.063-1.36-.307-2.142-.512-2.67a5.341 5.341 0 0 0-1.27-1.95 5.345 5.345 0 0 0-1.95-1.27c-.53-.206-1.311-.45-2.672-.513C15.333 1.012 14.976 1 12 1s-3.333.012-4.532.065c-1.36.063-2.142.307-2.67.512-.77.298-1.371.69-1.95 1.27a5.36 5.36 0 0 0-1.27 1.95c-.206.53-.45 1.311-.513 2.672C1.012 8.667 1 9.024 1 12s.012 3.333.065 4.532c.063 1.36.307 2.142.512 2.67.297.77.69 1.372 1.27 1.95.58.581 1.181.974 1.95 1.27.53.206 1.311.45 2.672.513C8.667 22.988 9.024 23 12 23s3.333-.012 4.532-.065c1.36-.063 2.142-.307 2.67-.512a5.33 5.33 0 0 0 1.95-1.27 5.356 5.356 0 0 0 1.27-1.95c.206-.53.45-1.311.513-2.672.053-1.198.065-1.555.065-4.531s-.012-3.333-.065-4.532Zm-1.998 8.972c-.05 1.07-.228 1.652-.38 2.04-.197.51-.434.874-.82 1.258a3.362 3.362 0 0 1-1.258.82c-.387.151-.97.33-2.038.379-1.162.052-1.51.063-4.441.063s-3.28-.01-4.44-.063c-1.07-.05-1.652-.228-2.04-.38a3.354 3.354 0 0 1-1.258-.82 3.362 3.362 0 0 1-.82-1.258c-.151-.387-.33-.97-.379-2.038C3.011 15.28 3 14.931 3 12s.01-3.28.063-4.44c.05-1.07.228-1.652.38-2.04.197-.51.434-.875.82-1.26a3.372 3.372 0 0 1 1.258-.819c.387-.15.97-.329 2.038-.378C8.72 3.011 9.069 3 12 3s3.28.01 4.44.063c1.07.05 1.652.228 2.04.38.51.197.874.433 1.258.82.385.382.622.747.82 1.258.151.387.33.97.379 2.038C20.989 8.72 21 9.069 21 12s-.01 3.28-.063 4.44Zm-4.584-6.828-5.25-3a2.725 2.725 0 0 0-2.745.01A2.722 2.722 0 0 0 6.988 9v6c0 .992.512 1.88 1.37 2.379.432.25.906.376 1.38.376.468 0 .937-.123 1.365-.367l5.25-3c.868-.496 1.385-1.389 1.385-2.388s-.517-1.892-1.385-2.388Zm-.993 3.04-5.25 3a.74.74 0 0 1-.748-.003.74.74 0 0 1-.374-.649V9a.74.74 0 0 1 .374-.65.737.737 0 0 1 .748-.002l5.25 3c.341.196.378.521.378.652s-.037.456-.378.651Z"></path>
                        </svg>
                    </div>
                    <div className="icon p-[0.7vw] rounded-lg hover:bg-[#1A1A1A] transition-all cursor-pointer">
                        <svg aria-label="Messages" className='h-[1.5vw] w-[1.5vw]' fill="white" height="24" role="img"
                             viewBox="0 0 24 24" width="24"><title>Messages</title>
                            <path
                                d="M13.973 20.046 21.77 6.928C22.8 5.195 21.55 3 19.535 3H4.466C2.138 3 .984 5.825 2.646 7.456l4.842 4.752 1.723 7.121c.548 2.266 3.571 2.721 4.762.717Z"
                                fill="none" stroke="white" strokeLinejoin="round" strokeWidth="2"></path>
                            <line fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="2" x1="7.488" x2="15.515" y1="12.208" y2="7.641"></line>
                        </svg>
                    </div>
                    <div className="icon p-[0.7vw] rounded-lg hover:bg-[#1A1A1A] transition-all cursor-pointer">
                        <svg aria-label="Notifications" className='h-[1.5vw] w-[1.5vw]' fill="white" height="24"
                             role="img" viewBox="0 0 24 24" width="24"><title>Notifications</title>
                            <path
                                d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                        </svg>
                    </div>
                    <div
                        onClick={() => { navigate('/create-post') }}
                        className="icon p-[0.7vw] rounded-lg hover:bg-[#1A1A1A] transition-all cursor-pointer">
                        <svg aria-label="New post" className='h-[1.5vw] w-[1.5vw]' fill="white" height="24" role="img"
                             viewBox="0 0 24 24" width="24"><title>New post</title>
                            <path
                                d="M21 11h-8V3a1 1 0 1 0-2 0v8H3a1 1 0 1 0 0 2h8v8a1 1 0 1 0 2 0v-8h8a1 1 0 1 0 0-2Z"></path>
                        </svg>
                    </div>
                    <Link to='/profile'>
                        <div className="icon p-[0.7vw] rounded-lg hover:cursor-pointer hover:bg-[#1A1A1A]">
                            <div
                                className={`bg-white ${loc === '/profile' ? "border-2 border-white" : ""} overflow-hidden h-[1.5vw] w-[1.5vw] rounded-full`}>
                                <img className="h-full w-full object-cover"
                                     src="https://imgs.search.brave.com/ZKYDA1AnTDG4bikMzyAShVXD1wBPxfe_F8kNuvgLC98/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvMzQ5/Nzc3Ni5qcGc"
                                     alt=""/>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Messages Popup */}
            {msgOpen && (
                <div
                    className="z-[100] absolute bg-[#212328] text-white right-[1vw] rounded-xl bottom-[1vw] h-[30vw] w-[21vw]">
                    <div
                        className="top h-[4vw] px-[0.8vw] border-b-[2px] border-gray-800 flex justify-between items-center">
                        <h3 className='font-bold'>Messages</h3>
                        <div className="svgs flex items-center gap-[1vw]">
                            <svg aria-label="Expand" className='cursor-pointer' fill="white" height="20" role="img"
                                 viewBox="0 0 24 24" width="20"><title>Expand</title>
                                <path
                                    d="M10 20H4v-6a1 1 0 0 0-2 0v7a1 1 0 0 0 1 1h7a1 1 0 0 0 0-2ZM20.999 2H14a1 1 0 0 0 0 2h5.999v6a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1Z"></path>
                            </svg>
                            <svg onClick={() => setMsgOpen(false)} aria-label="Close" className='cursor-pointer'
                                 fill="white" height="20" role="img" viewBox="0 0 24 24" width="20"><title>Close</title>
                                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2" x1="21" x2="3" y1="3" y2="21"></line>
                                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2" x1="21" x2="3" y1="21" y2="3"></line>
                            </svg>
                        </div>
                    </div>
                    <h2 className='font-medium text-sm h-[25vw] flex items-center justify-center'>No messages
                        found.</h2>
                </div>
            )}
        </div>
    )
}

export default Sidebar