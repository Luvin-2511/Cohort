import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading:(state,action)=>{
        state.value = action.payload
    }
  },
});

export const {setLoading} = chatSlice.actions
export default chatSlice.reducer
