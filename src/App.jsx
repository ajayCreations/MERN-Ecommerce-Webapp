
import React, { useEffect, useState } from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom"

import './App.css'
import Footer from './component/layout/footer/Footer'
import Header from './component/layout/header/Header'
import Home from './component/Home/Home.jsx'
import Contact from './component/layout/contact/Contact'
import ProductDetails from './component/Product/ProductDetails.jsx'

import Login from './component/auth/Login'
import ForgotPassword from './component/auth/ForgotPassword'
import Signup from './component/auth/Signup'

import Orders from './component/orders/Orders'
import Cart from './component/cart/Cart'
import ProductLists from './component/ProductLists/ProductLists'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import axios from 'axios';
import User from './component/user/User'
import Admin from './component/admin/Admin'
import ProtectedRoute from './ProtectedRoutes'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function App() {

  const ViewHeader = useSelector(state => state.GoToAuth.OnLoginPage);
  const dispatch = useDispatch();

  const [isLogin, setIslogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const LoadUser = async () => {
    const onlogin = await JSON.parse(localStorage.getItem('onlogin'));
    const checkuser = await JSON.parse(localStorage.getItem('checkuser'));
    const cartItems = await JSON.parse(localStorage.getItem('cartItems'));
    
    dispatch({
      type: "GoToAuth",
      payload: onlogin
    })


    if (checkuser) {
      setIslogin(v => v = true);
      if (checkuser.role == 'admin') setIsAdmin(v => v = true);
      dispatch({
        type: "LoginUser",
        payload: checkuser
      })
    }

    if(cartItems){
      dispatch({
        type: "AddToCart",
        payload: cartItems
    })
    }

  }

  useEffect(() => {
    let start = true;
    if (start) {
      LoadUser();
    }

    return () => {
      start = false;
    }
  }, [])



  return (
    <BrowserRouter>

      {ViewHeader ? <Header /> : null}

      <Routes>
        <Route path="/" element={<Home />} />


        <Route element={<ProtectedRoute isAuthenticated={!isLogin} isAdmin={!isAdmin} redirect='user/me' redirectAdmin="/admin/dashboard" />}>
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
        </Route>


          <Route path="/password/reset" element={<ForgotPassword />} />

        <Route path='/orders' element={<Orders />} />
        <Route path='/cart' element={<Cart />} />

        <Route path="product/:id" element={<ProductDetails />} />
        <Route path='/products/:keyword' element={<ProductLists />} />

        <Route path='/user/me' element={<ProtectedRoute isAuthenticated={isLogin} isAdmin={!isAdmin} redirectAdmin='/admin/dashboard'>
          <User />
        </ProtectedRoute>} />

        <Route path='/admin/dashboard' element={
          <ProtectedRoute isAuthenticated={isLogin} isAdmin={isAdmin} redirectAdmin='/'>
            <Admin />
          </ProtectedRoute>
        } />





        <Route path="/contact" element={<Contact />} />
      </Routes>

      {ViewHeader ? <Footer /> : null}

    </BrowserRouter>
  )
}

export default App