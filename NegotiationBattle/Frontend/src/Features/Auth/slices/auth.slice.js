import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: true,
    user: null,
    error: null,
    isCharacterSelected: false,
    character: null
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsCharacterSelected: (state, action) => {
      state.isCharacterSelected = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCharacter : (state, action) => {
      state.character = action.payload;
    }
  },
});

export const { setLoading, setUser, setError,setCharacter, setIsCharacterSelected, clearError } =
  authSlice.actions;
export default authSlice.reducer;
