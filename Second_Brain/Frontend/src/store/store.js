import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../Features/Auth/slices/auth.slice.jsx'
import itemReducer from '../Features/Item/slices/item.slice.jsx'

export const store = configureStore({
    reducer : {
        auth:authReducer,
        item:itemReducer
    }
})