import React, {useEffect} from 'react'
import Post from "../components/Post.jsx";
import Sidebar from "../components/SideBar.jsx";
import usePost from "../Hooks/usePost.jsx";

const Feed = () => {
    const {loading, feed, handleGetFeed} = usePost()
    console.log(feed)
    useEffect(() => {
        handleGetFeed()
    }, [])


    return (
        <main className='min-w-full aspect-video bg-black'>
            <Sidebar/>
            {loading || !feed ?
                <div
                    className={`loadingLiner ${loading ? "animate-[Loading_0.7s_linear_forwards]" : ""} transition-all duration-700 absolute animate-loader py-0.5 bg-gradient-to-l from-pink-500 via-blue-600 via-blue-400 via-pink-500 to-blue-500`}>
                </div> :
                <>
                {
                    feed.map((postData) => {
                        return <Post postData={postData}/>
                    })
                }
                </>
            }
        </main>
    )
}
export default Feed
