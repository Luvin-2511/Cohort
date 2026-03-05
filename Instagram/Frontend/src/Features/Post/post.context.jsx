import {createContext, useState} from "react";

export const postContext = createContext()

const PostContextProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [feed, setFeed] = useState(null)
    const [userPosts, setuserPosts] = useState(null)
    const [followRecord, setfollowRecord] = useState(null)
    const [followRequest, setfollowRequest] = useState(null)

    return (
        <postContext.Provider value={{
            loading,
            setLoading,
            feed,
            setFeed,
            userPosts,
            setuserPosts,
            followRequest,
            setfollowRequest
        }}>
            {children}
        </postContext.Provider>
    )
}
export default PostContextProvider
