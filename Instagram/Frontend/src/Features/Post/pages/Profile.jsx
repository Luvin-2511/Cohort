import React, {useEffect, useState} from "react";
import Sidebar from "../components/SideBar.jsx";
import {useNavigate} from "react-router-dom";
import Footer from "../../Auth/components/Footer.jsx";
import useAuth from "../../Auth/Hooks/useAuth.jsx";
import usePost from "../Hooks/usePost.jsx";

const Profile = () => {
    const {user} = useAuth()
    const [activeTab, setActiveTab] = useState("posts");
    const navigate = useNavigate()
    const RandomFollower = Math.floor(Math.random() * 1000).toLocaleString()
    const RandomFollowing = Math.floor(Math.random() * 1000).toLocaleString()
    const {loading, handleGetPost, userPosts} = usePost()
    useEffect(() => {
        handleGetPost()
    }, [])

    if (loading || !userPosts) {
        return <div className="min-h-screen bg-black text-white flex">
            <Sidebar/>
            <div className="flex-1 ml-0 md:ml-[72px] lg:ml-[244px] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"/>
            </div>
        </div>
    }
    return (
        <div className="min-h-screen bg-black text-white flex">
            <Sidebar/>
            <div className="flex-1 ml-30 md:ml-[72px] lg:ml-[244px] flex flex-col items-center">
                <div className="w-full max-w-[935px] px-4 pt-8">

                    {/* ── Header ── */}
                    <div className="flex items-center gap-4 md:gap-10 mb-6 px-2 md:px-4">

                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            <div
                                className="w-[80px] h-[80px] md:w-[150px] md:h-[150px] rounded-full bg-[#2a2a2a] flex items-center justify-center overflow-hidden border-2 border-gray-700 cursor-pointer group">
                                <img src={user.profileImg} alt="profile"
                                     className="w-full h-full object-cover"/>
                            </div>

                            {/* Camera hover overlay */}
                            <div
                                onClick={() => {
                                    navigate('/edit-profile')
                                }}
                                className="absolute inset-0 rounded-full flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M12 15.2A3.2 3.2 0 0 1 8.8 12 3.2 3.2 0 0 1 12 8.8 3.2 3.2 0 0 1 15.2 12 3.2 3.2 0 0 1 12 15.2M9 2L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4H16.83L15 2H9Z"/>
                                </svg>
                            </div>

                            {/* Note bubble — hidden on tiny screens */}
                            <div
                                className="hidden sm:block absolute -top-1 left-0 bg-[#1a1a1a] border border-gray-700 rounded-2xl px-2 py-1 text-xs text-gray-300 whitespace-nowrap">
                                Note...
                            </div>
                        </div>

                        {/* User info */}
                        <div className="flex flex-col gap-3 flex-1 min-w-0">

                            {/* Username + verified */}
                            <div className="flex items-center gap-2 flex-wrap">
                                <h1 className="text-base md:text-xl font-light tracking-wide truncate">{user.username}</h1>
                                <svg fill="rgb(0, 149, 246)" height="16" viewBox="0 0 40 40" width="16">
                                    <path
                                        d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                                        fillRule="evenodd"/>
                                </svg>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-4 md:gap-8">
                                <div className="flex flex-col sm:flex-row sm:gap-1 items-center text-sm">
                                    <span className="font-semibold">{userPosts.length}</span>
                                    <span className="text-gray-300 text-xs sm:text-sm">posts</span>
                                </div>
                                <div
                                    className="flex flex-col sm:flex-row sm:gap-1 items-center text-sm cursor-pointer hover:opacity-70 transition-opacity">
                                    <span className="font-semibold">{RandomFollower}</span>
                                    <span className="text-gray-300 text-xs sm:text-sm">followers</span>
                                </div>
                                <div
                                    className="flex flex-col sm:flex-row sm:gap-1 items-center text-sm cursor-pointer hover:opacity-70 transition-opacity">
                                    <span className="font-semibold">{RandomFollowing}</span>
                                    <span className="text-gray-300 text-xs sm:text-sm">following</span>
                                </div>
                            </div>

                            {/* Name — desktop only (shown separately on mobile) */}{/* Name + Bio — desktop only */}
                            <div className="hidden sm:flex flex-col gap-1">
                                <div className="text-sm font-semibold">{user.name}</div>
                                {user.bio ? (
                                    <p className="text-sm text-white whitespace-pre-line leading-snug">{user.bio}</p>
                                ) : (
                                    <p
                                        onClick={() => navigate('/edit-profile')}
                                        className="text-sm text-gray-500 cursor-pointer hover:text-gray-300 transition-colors"
                                    >
                                        + Add bio
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Name — mobile only */}
                    <div className="sm:hidden text-sm font-semibold px-2 mb-4">{user.name}</div>

                    {/* ── Buttons ── */}
                    <div className="flex items-center gap-2 mb-6 px-2 md:px-4">
                        <button
                            onClick={() => {
                                navigate('/edit-profile')
                            }}
                            className="flex-1 bg-[#262626] hover:bg-[#333] transition-colors text-white text-sm font-semibold py-[7px] rounded-lg">
                            Edit profile
                        </button>
                        <button
                            className="flex-1 bg-[#262626] hover:bg-[#333] transition-colors text-white text-sm font-semibold py-[7px] rounded-lg">
                            View archive
                        </button>
                    </div>

                    {/* ── Highlights ── */}
                    <div className="flex items-center gap-6 px-2 md:px-4 mb-6 overflow-x-auto pb-2">
                        <div className="flex flex-col items-center gap-1 flex-shrink-0">
                            <div
                                className="w-[67px] h-[67px] md:w-[77px] md:h-[77px] rounded-full border-2 border-gray-700 flex items-center justify-center cursor-pointer hover:border-gray-500 transition-colors bg-[#1a1a1a]">
                                <svg className="w-7 h-7 text-white" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <line x1="12" y1="5" x2="12" y2="19"/>
                                    <line x1="5" y1="12" x2="19" y2="12"/>
                                </svg>
                            </div>
                            <span className="text-xs text-gray-300">New</span>
                        </div>
                    </div>

                    {/* ── Tabs ── */}
                    <div className="flex items-center justify-around border-t border-gray-800 mb-1">
                        {[
                            {
                                key: "posts",
                                icon: (
                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                         fill="currentColor">
                                        <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/>
                                    </svg>
                                ),
                            },
                            {
                                key: "saved",
                                icon: (
                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                                    </svg>
                                ),
                            }
                        ].map(({key, icon}) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`flex items-center gap-1 py-3 px-4 md:px-8 text-xs font-semibold tracking-widest uppercase border-t-[1px] transition-colors ${
                                    activeTab === key ? "border-white text-white" : "border-transparent text-gray-500 hover:text-gray-300"
                                }`}
                            >
                                {icon}
                            </button>
                        ))}
                    </div>

                    {/* ── Posts Grid ── */}
                    {activeTab === "posts" && (
                        userPosts && userPosts.length > 0 ? (
                            <div className="grid grid-cols-3 gap-[3px] mb-10">
                                {userPosts.map((post) => (
                                    <div key={post._id}
                                         className="aspect-square overflow-hidden rounded cursor-pointer group relative">
                                        <img src={post.url} alt=""
                                             className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"/>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div
                                onClick={() => {
                                    navigate('/create-post')
                                }}
                            >

                                <EmptyState
                                    icon={<svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg"
                                               viewBox="0 0 24 24" fill="currentColor">
                                        <path
                                            d="M12 15.2A3.2 3.2 0 0 1 8.8 12 3.2 3.2 0 0 1 12 8.8 3.2 3.2 0 0 1 15.2 12 3.2 3.2 0 0 1 12 15.2M9 2L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4H16.83L15 2H9Z"/>
                                    </svg>}
                                    title="Share Photos"
                                    subtitle="When you share photos, they will appear on your profile."
                                    action={<button
                                        className="text-[#0095f6] text-sm font-semibold hover:text-white transition-colors">Share
                                        your first photo</button>}
                                />
                            </div>
                        )
                    )}

                    {activeTab === "saved" && (
                        <EmptyState
                            icon={<svg className="w-7 h-7 text-white" xmlns="http://www.w3.org/2000/svg"
                                       viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                            </svg>}
                            title="Save"
                            subtitle="Save photos and videos that you want to see again."
                        />
                    )}

                    {activeTab === "tagged" && (
                        <EmptyState
                            icon={<svg className="w-7 h-7 text-white" xmlns="http://www.w3.org/2000/svg"
                                       viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>}
                            title="Photos of you"
                            subtitle="When people tag you in photos, they'll appear here."
                        />
                    )}

                    {/* Bottom padding — prevents content hiding behind mobile bottom nav */}
                    <div className="h-20 md:h-4"/>
                </div>
                <Footer/>
            </div>
        </div>
    );
};

const EmptyState = ({icon, title, subtitle, action}) => (
    <div className="flex flex-col items-center justify-center py-16 md:py-20 gap-4">
        <div className="w-[62px] h-[62px] rounded-full border-2 border-white flex items-center justify-center">
            {icon}
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{title}</h2>
        <p className="text-gray-400 text-sm text-center max-w-[280px]">{subtitle}</p>
        {action && action}
    </div>
);

export default Profile;