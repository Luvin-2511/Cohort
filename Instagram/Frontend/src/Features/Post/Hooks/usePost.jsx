import {useContext, useEffect} from 'react'
import {postContext} from "../post.context.jsx";
import {
    createPost,
    deletePost,
    followStatusUpdate,
    followUser,
    getFeed,
    getFollowRequests,
    getPost,
    likePost,
    unLikePost,
    updateProfile
} from "../services/post.api.js";
import useAuth from "../../Auth/Hooks/useAuth.jsx";


const UsePost = () => {
    const {
        loading,
        setLoading,
        feed,
        setFeed,
        userPosts,
        setuserPosts,
        followRequest,
        setfollowRequest
    } = useContext(postContext)
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

    const handleFollowUser = async (followeeUsername) => {
        setLoading(true)
        try {
            const response = await followUser(followeeUsername)
            return (response.followRecord)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const handlefollowStatusUpdate = async (followername, status) => {
        setLoading(true)
        try {
            const response = await followStatusUpdate(followername, status)
            return (response.followRecord)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }


    const handleGetFollowRequest = async () => {
        setLoading(true)
        try {
            const response = await getFollowRequests()
            console.log(response.requests)
            setfollowRequest(response.requests)
        } catch (e) {
            console.log(e)
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
        userPosts,
        followRequest,
        setfollowRequest,
        handleGetFeed,
        handleCreatePost,
        handleLikePost,
        handleunLikePost,
        handleDeletePost,
        handleGetPost,
        handleUpdateProfile,
        handleFollowUser,
        handlefollowStatusUpdate,
        handleGetFollowRequest
    }
}
export default UsePost
