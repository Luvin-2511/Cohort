import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/slices/auth.slice'
import chatSlice from '../features/chats/slices/chat.slice'
import userSlice from '../features/user/slices/user.slice'

export const store = configureStore({
  reducer: {
    auth:authSlice,
    chat:chatSlice,
    user:userSlice
  }
})