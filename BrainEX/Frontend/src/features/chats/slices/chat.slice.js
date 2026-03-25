import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    loading: false,
    chats: [],
    messages:[]
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
  },
});

export const { setLoading, setChats, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
