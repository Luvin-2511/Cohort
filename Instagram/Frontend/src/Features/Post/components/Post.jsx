import React, {useEffect, useRef, useState} from 'react'
import "../styles/post.scss"

const Post = ({postData, loading, handleLikePost, handleunLikePost, handleDeletePost}) => {
    const RandomLike = Math.floor(Math.random() * 100000).toLocaleString()
    const RandomComment = Math.floor(Math.random() * 10000).toLocaleString()
    const [menuOpen, setMenuOpen] = useState(false)
    const [following, setFollowing] = useState(false)
    const menuRef = useRef(null)

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className='flex items-center justify-center w-full py-3 px-4'>
            <div className="w-full max-w-[500px] border-b border-gray-800 pb-4 mb-4">

                <div className="flex items-center justify-between">
                    <div className='flex items-center gap-3 cursor-pointer'>
                        <div
                            className="img-wrapper h-10 w-10 p-[2px] flex justify-center items-center rounded-full overflow-hidden">
                            <img
                                className='object-cover h-full w-full rounded-full'
                                src={postData.user.profileImg}
                                alt=""
                            />
                        </div>

                        <div className="flex items-center gap-1 text-white text-sm font-semibold">
                            {postData.user.username}
                            <svg fill="rgb(0, 149, 246)" height="12" viewBox="0 0 40 40" width="12">
                                <path
                                    d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                                    fillRule="evenodd"></path>
                            </svg>
                            <span className="text-gray-500 text-xs">• 1d</span>
                        </div>

                        <span className="text-gray-500 text-xs">•</span>
                        <button
                            onClick={() => setFollowing(prev => !prev)}
                            className="text-sm font-semibold cursor-pointer transition-colors"
                            style={{ color: following ? '#a8a8a8' : 'rgb(0, 149, 246)' }}
                        >
                            {following ? 'Following' : 'Follow'}
                        </button>
                    </div>

                    {/* 3-dots button + dropdown */}
                    <div className="relative" ref={menuRef}>
                        <div
                            className="cursor-pointer"
                            onClick={() => setMenuOpen(prev => !prev)}
                        >
                            <svg fill="white" height="22" viewBox="0 0 24 24" width="22">
                                <circle cx="12" cy="12" r="1.5"></circle>
                                <circle cx="6" cy="12" r="1.5"></circle>
                                <circle cx="18" cy="12" r="1.5"></circle>
                            </svg>
                        </div>

                        {menuOpen && (
                            <div
                                className="absolute right-0 top-7 z-50 bg-[#262626] rounded-xl shadow-lg overflow-hidden w-36 border border-gray-700">
                                <button
                                    onClick={() => {
                                        setMenuOpen(false)
                                        handleDeletePost(postData._id)
                                    }}
                                    className="w-full flex items-center gap-2 px-4 py-3 text-red-500 text-sm font-semibold hover:bg-[#333] transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                         className="w-4 h-4">
                                        <path
                                            d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"/>
                                    </svg>
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full overflow-hidden rounded-sm mt-3 border border-gray-800">
                    <img
                        className='h-full w-full object-cover'
                        src={postData.url}
                        alt=""
                    />
                </div>

                <div className="mt-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <svg
                                onClick={() => {
                                    postData.isLiked ? handleunLikePost(postData._id) : handleLikePost(postData._id)
                                }}
                                strokeWidth="2"
                                className="h-7 w-7 cursor-pointer"
                                stroke={`${postData.isLiked ? "red" : "white"}`}
                                fill={`${postData.isLiked ? "red" : "transparent"}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path>
                            </svg>
                            <svg className='h-7 w-7 cursor-pointer' xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24" fill="white">
                                <path
                                    d="M7.29117 20.8242L2 22L3.17581 16.7088C2.42544 15.3056 2 13.7025 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.2975 22 8.6944 21.5746 7.29117 20.8242ZM7.58075 18.711L8.23428 19.0605C9.38248 19.6745 10.6655 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 13.3345 4.32549 14.6175 4.93949 15.7657L5.28896 16.4192L4.63416 19.3658L7.58075 18.711Z"></path>
                            </svg>
                            <svg className='h-7 w-7 cursor-pointer' xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24" fill="white">
                                <path
                                    d="M13 14H11C7.54202 14 4.53953 15.9502 3.03239 18.8107C3.01093 18.5433 3 18.2729 3 18C3 12.4772 7.47715 8 13 8V2.5L23.5 11L13 19.5V14ZM11 12H15V15.3078L20.3214 11L15 6.69224V10H13C10.5795 10 8.41011 11.0749 6.94312 12.7735C8.20873 12.2714 9.58041 12 11 12Z"></path>
                            </svg>
                        </div>

                        <svg className='h-7 w-7 cursor-pointer hover:fill-gray-400' xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 24 24" fill="white">
                            <path
                                d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2ZM18 4H6V19.4324L12 15.6707L18 19.4324V4Z"></path>
                        </svg>
                    </div>

                    <div className="text-white mt-2 text-sm font-semibold">
                        {RandomLike} likes
                    </div>

                    <div className="mt-2 text-white text-sm line-clamp-3">
                        <span className="font-semibold mr-2">{postData.user.username}</span>
                        {postData.caption}
                    </div>

                    <div className="text-gray-400 text-sm mt-2">
                        View all {RandomComment} comments
                    </div>

                    <div className="flex items-center justify-between mt-2">
                        <input
                            className='bg-transparent text-white placeholder:text-gray-400 text-sm flex-1 focus:outline-none'
                            type="text"
                            placeholder='Add a comment...'
                        />
                        <svg fill="white" height="18" viewBox="0 0 24 24" width="18" className="cursor-pointer"></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post