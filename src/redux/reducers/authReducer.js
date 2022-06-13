import { createReducer } from "@reduxjs/toolkit";

const initialState={user:{}};

export const authReducer = createReducer(initialState,{
    
    LoginUser:(state,action)=>{
        state.user=action.payload
        localStorage.setItem('checkuser',JSON.stringify(action.payload));
    }
})