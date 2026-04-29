import { configureStore } from "@reduxjs/toolkit";
import authReducer  from "./Features/Auth/slices/auth.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
