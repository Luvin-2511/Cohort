import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        loading:false,
        errors:false,
        fontSize:"medium"
    },
    reducers:{
        setLoading:(state,action)=>{
            state.loading = action.payload
        },
        setErrors:(state,action)=>{
            state.errors = action.payload
        },
        setFontSize:(state,action)=>{
            state.fontSize = action.payload
        }
    }
})

export const {setLoading,setErrors,setFontSize} = userSlice.actions
export default userSlice.reducer