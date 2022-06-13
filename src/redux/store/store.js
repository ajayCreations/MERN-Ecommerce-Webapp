import {configureStore} from '@reduxjs/toolkit'
import { authReducer } from '../reducers/authReducer';
import { productReducer } from '../reducers/ProductReducer';
import { Auth } from '../reducers/root'


const store = configureStore({
    reducer:{
        GoToAuth:Auth,
        Product:productReducer,
        Auth:authReducer
    }
});


export default store;