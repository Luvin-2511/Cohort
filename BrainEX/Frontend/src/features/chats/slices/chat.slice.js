import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    loading: false,
    chats: [],
    messages: [],
    chatId: null,
    error: false,
    prompts: null,
    isFetchingChats: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setChatId: (state, action) => {
      state.chatId = action.payload;
    },
    setFetchingChats: (state, action) => {
      state.isFetchingChats = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPrompts: (state, action) => {
      state.prompts = action.payload;
    },
  },
});

export const {
  setPrompts,
  setLoading,
  setChats,
  setMessages,
  setChatId,
  addMessage,
  setError,
  setFetchingChats,
} = chatSlice.actions;
export default chatSlice.reducer;
