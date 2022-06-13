import { createReducer } from "@reduxjs/toolkit";


const initialState={
    products:[],
    cartProducts:[]
}

export const productReducer = createReducer(initialState,{
    
    GetAllProducts:(state,actions)=>{
        state.products=actions.payload;
    },

    AddToCart:(state,actions)=>{
        state.cartProducts=actions.payload;
        localStorage.setItem('cartItems',JSON.stringify(actions.payload));
    },

    

})