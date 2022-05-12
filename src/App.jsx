import React from 'react'
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import './App.css'
import Footer from './component/layout/footer/Footer'
import Header from './component/layout/header/Header'
import Home from './component/Home/Home'
import Contact from './component/layout/contact/Contact'



const App = () => {
  return (
    //  <Provider>
    <>
      <BrowserRouter>
        <Header />

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route>404 Not Found!</Route>

        </Routes>


        <Footer />
      </BrowserRouter>

    </>
    //  </Provider>

  )
}

export default App