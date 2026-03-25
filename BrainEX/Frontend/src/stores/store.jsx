import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/slices/auth.slice'
import chatSlice from '../features/chats/slices/chat.slice'

export const store = configureStore({
  reducer: {
    auth:authSlice,
    chat:chatSlice
  }
})