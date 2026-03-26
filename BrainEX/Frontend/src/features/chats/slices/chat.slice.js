import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    loading: false,
    chats: [],
    messages:[],
    chatId:null,
    error:false,
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
    addMessage:(state,action)=>{
      state.messages.push(action.payload)
    },
    setChatId:(state,action)=>{
      state.chatId = action.payload
    },
    setError:(state,action)=>{
      state.error = action.payload
    }
  },
});

export const { setLoading, setChats, setMessages, setChatId, addMessage,setError } = chatSlice.actions;
export default chatSlice.reducer;
