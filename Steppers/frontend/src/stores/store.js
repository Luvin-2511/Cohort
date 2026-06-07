import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/slices/auth.slice'
import productReducer from '../features/product/slices/product.slice'

export const store = configureStore({
    reducer: {
        auth:authReducer,
        product:productReducer,
    }
})