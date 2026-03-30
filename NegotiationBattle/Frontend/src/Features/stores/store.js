import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../Auth/slices/auth.slice.js'
import gameReducer from '../Game/slices/game.slice.js'

export const store = configureStore({
    reducer:{
        auth:authReducer,
        game:gameReducer
    }
});