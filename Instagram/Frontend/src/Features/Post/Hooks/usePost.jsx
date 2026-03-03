import {useContext, useEffect} from 'react'
import {postContext} from "../post.context.jsx";
import {createPost, deletePost, getFeed, getPost, likePost, unLikePost, updateProfile} from "../services/post.api.js";
import useAuth from "../../Auth/Hooks/useAuth.jsx";


const UsePost = () => {
    const {loading, setLoading, feed, setFeed, userPosts, setuserPosts} = useContext(postContext)
    const {setUser} = useAuth()

    const handleGetFeed = async () => {
        setLoading(true)
        try {
            const response = await getFeed()
            setFeed(response.isLikedPost.reverse())
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const handleCreatePost = async (file, section) => {
        setLoading(true)
        try {
            const response = await createPost(file, section)
            setFeed([response.post, ...feed])
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const handleLikePost = async (postId) => {
        setLoading(true)
        try {
            const response = await likePost(postId)
            await handleGetFeed()
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const handleunLikePost = async (postId) => {
        setLoading(true)
        try {
            const response = await unLikePost(postId)
            await handleGetFeed()
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const handleDeletePost = async (postId) => {
        setLoading(true)
        try {
            await deletePost(postId)
            await handleGetFeed()
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const handleGetPost = async () => {
        setLoading(true)
        try {
            const data = await getPost()
            setuserPosts(data.post)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdateProfile = async (file, bio) => {
        setLoading(true)
        try {
            const response = await updateProfile(file, bio)
            console.log("response.user.profileImg:", response.user.profileImg)
            setUser(response.user)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleGetFeed()
    }, []);


    return {
        loading,
        feed,
        handleGetFeed,
        handleCreatePost,
        handleLikePost,
        handleunLikePost,
        handleDeletePost,
        handleGetPost,
        handleUpdateProfile,
        userPosts
    }
}
export default UsePost
