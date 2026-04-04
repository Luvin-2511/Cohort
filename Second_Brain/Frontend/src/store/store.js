import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../Features/Auth/slices/auth.slice.jsx'

export const store = configureStore({
    reducer : {
        auth:authReducer
    }
})