import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "item",
  initialState: {
    loading: false,
    error: null,
    items: [],
    matchedItems: [],
    resurfacedItems: [],
    relatedItems: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setMatchedItems: (state, action) => {
      state.matchedItems = action.payload;
    },
    setResurfacedItems: (state, action) => {
      state.resurfacedItems = action.payload;
    },
    setRelatedItems: (state, action) => {
      state.relatedItems = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setItems,
  setMatchedItems,
  setResurfacedItems,
  setRelatedItems,
} = itemSlice.actions;

export default itemSlice.reducer;