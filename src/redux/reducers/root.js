import {createReducer} from '@reduxjs/toolkit'

const vitals={
    OnLoginPage:true,
}


export const Auth = createReducer(vitals,{

    GoToAuth:(state,action)=>{
        state.OnLoginPage =  action.payload
        localStorage.setItem('onlogin',JSON.parse(action.payload));
    }

})