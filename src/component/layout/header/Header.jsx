import React, { useState } from 'react'
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser
} from 'react-icons/ai'
import { Link, Outlet } from 'react-router-dom'
import './Header.css'



const Header = () => {
  const [click, setClick] = useState(true);

  const navitems = () => {

    return (
      <>
        <ul className="nav__menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/product">Product</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        <Outlet />
      </>
    )
  }


  return (
    <nav>
      <div className="container nav_container">
        <a href="/">
          <h3 className='logo'>Z-Comm</h3>
        </a>


        {/* {!click ? navitems() : null} */}
        {navitems()}


        <ul className="nav__icons">
          <li><a href="" className="search"><AiOutlineSearch /></a></li>
          <li><a href="" className="cart"><AiOutlineShoppingCart /></a></li>
          <li><a href="" className="user"><AiOutlineUser /></a></li>

        </ul>

        <span className='menu__buttons'>

          <button
            className="click__buttons"
            onClick={() => setClick(click => !click)}
          >{click ? (<AiOutlineMenu />) : (<AiOutlineClose />)}</button>
        </span>

      </div>

    </nav>
  )
}

export default Header 