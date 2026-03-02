import {createContext, useState} from "react";

export const postContext = createContext()

const PostContextProvider = ({children}) => {
    const [loading, setLoading] = useState(false)
    const [feed, setFeed] = useState(null)
    return (
        <postContext.Provider value={{loading, setLoading, feed, setFeed}}>
            {children}
        </postContext.Provider>
    )
}
export default PostContextProvider
