import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Admin.css'



const Admin = () => {

  const dispatch = useDispatch();

  async function logout() {
    try {
      await axios.get('/api/v1/logout');
      await localStorage.clear();
      alert('Waiting for your ComeBack!');
      window.location.reload();
    } catch (e) {
      alert('Try Again Later');
      console.log('Alert while logout');
    }
  }

  useEffect(() => {
    dispatch({
      type: "GoToAuth",
      payload: true
    })
  }, [])


  return (
   <section className="admin_panel">
    <h1 onClick={()=>logout()}>This is admin Panel</h1>
   </section>
  )
}

export default Admin