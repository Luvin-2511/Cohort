import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    loading: false,
    chats: [],
    messages:[],
    chatId:null
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
    setChatId:(state,action)=>{
      state.chatId = action.payload
    }
  },
});

export const { setLoading, setChats, setMessages, setChatId } = chatSlice.actions;
export default chatSlice.reducer;
