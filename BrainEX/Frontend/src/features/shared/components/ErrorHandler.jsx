import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { setError as setAuthError } from "../../auth/slices/auth.slice"
import { setError as setChatError } from "../../chats/slices/chat.slice"
import { setErrors } from "../../user/slices/user.slice"

export default function ErrorHandler() {
  const dispatch = useDispatch()
  const authError = useSelector((state) => state.auth.error)
  const chatError = useSelector((state) => state.chat.error)
  const userError = useSelector((state) => state.user.errors)

  useEffect(() => {
    if (!authError) return
    toast.error(authError?.message || authError)
    dispatch(setAuthError(null))
  }, [authError])

  useEffect(() => {
    if (!chatError) return
    toast.error(chatError?.message || chatError)
    dispatch(setChatError(null))
  }, [chatError])

  useEffect(() => {
    if (!userError) return
    toast.error(userError?.message || userError)
    dispatch(setErrors(null))
  }, [userError])

  return null
}