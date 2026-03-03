import React, {useEffect} from 'react'
import Post from "../components/Post.jsx";
import Sidebar from "../components/SideBar.jsx";
import usePost from "../Hooks/usePost.jsx";
import useAuth from "../../Auth/Hooks/useAuth.jsx";
import {useNavigate} from "react-router-dom";

const Feed = () => {
    const {loading, feed, handleGetFeed} = usePost()
    const navigate = useNavigate()
    const {loadingAuth, user} = useAuth()

    useEffect(() => {
        handleGetFeed()
    }, [])

    if (!user && !loadingAuth) {
        navigate('/login')
    }


    return (
        <main className='min-w-full min-h-screen bg-black flex'>

            <div className='flex-1 ml-[5rem] md:ml-[14.5%] flex flex-col items-center py-4'>
                {loading || !feed ?
                    <div
                        className={`loadingLiner ${loading ? "animate-[Loading_0.7s_linear_forwards]" : ""} transition-all duration-700 absolute animate-loader py-0.5 bg-gradient-to-l from-pink-500 via-blue-600 via-blue-400 via-pink-500 to-blue-500`}>
                    </div> :
                    <>
                        <Sidebar/>
                        {feed.map((postData) => {
                            return <Post key={postData._id || postData.id} postData={postData}/>
                        })}
                    </>
                }
            </div>
        </main>
    )
}

export default Feed