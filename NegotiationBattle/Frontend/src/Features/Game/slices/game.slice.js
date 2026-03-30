import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    loading: false,
    error: null,
    currentProduct : null,
    allMsg:[]
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCurrentProduct: (state, action)=> {
        state.currentProduct = action.payload;
    },
    addMsg: (state, action)=> {
      state.allMsg.push(action.payload);
    }
  },
});

export const {setLoading,setError,setCurrentProduct,setAiMsg,addMsg} = gameSlice.actions;
export default gameSlice.reducer;
