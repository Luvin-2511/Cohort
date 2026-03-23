import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null,
        error:false,
    },
    reducers:{
        setLoading:(state,payload)=>{
            state.value = payload.action
        },
        setUser:(state,payload)=>{
            state.value = payload.action
        },
        setError:(state,payload)=>{
            state.value = payload.action
        },
    }
})

export const {setLoading,setUser,setError} = authSlice.reducer
export default authSlice
