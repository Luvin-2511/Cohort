import {useContext} from 'react'
import {postContext} from "../post.context.jsx";
import {getFeed} from "../services/post.api.js";

const UsePost = () => {
    const {loading, setLoading, feed, setFeed} = useContext(postContext)

    const handleGetFeed = async () => {
        setLoading(true)
        try {
            const response = await getFeed()
            setFeed(response.isLikedPost)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }



    return {loading, feed, handleGetFeed}
}
export default UsePost
