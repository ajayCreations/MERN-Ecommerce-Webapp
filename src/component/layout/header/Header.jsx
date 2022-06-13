import React, { useState } from 'react'
import { Link} from 'react-router-dom'
import './Header.css';
import amazonlogo from '../../../assets/images/amazon_logo.png';

import {GoSearch} from 'react-icons/go'
import {FiShoppingCart} from 'react-icons/fi'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const Header = () =>{

  const dispatch = useDispatch();
  const totalItems = useSelector(state=>state.Product.cartProducts.length);
  const {name}=useSelector(state=>state.Auth.user);
  console.log('Getting in header',name)
  const [keyword,setKeyword]= useState('phone');

  function OnLoginPage(){
    dispatch({
      type:"GoToAuth",
      payload:false
    })
  }


  return (
    <nav>

      <div className="logo_header">

          <Link to={'/'}>
          <img src={amazonlogo} alt="amazon-logo" className='amazon_logo'/>
          </Link>

          <div className='search_box'>
            <input type="search" name="search" id='search' onChange={(e)=>setKeyword(()=>e.target.value)}  />
            <Link to={`/products/${keyword}`} >
            <span className='search_logo_box'>
            <GoSearch className='search_logo'/>
            </span>
            </Link>
          </div>

          <div className="left_options">

            <Link to={'/login'} onClick={()=>OnLoginPage()}>
            <article className="sign_in">
              <small>Hello</small>
              <h3 className='its_name'>{name?name:"Sign in"}</h3>
            </article>
            </Link>

            <Link to={'/orders'} >
            <article className="return_order">
              <small>Returns</small>
              <h3>& Orders</h3>
            </article>
            </Link>


              <Link to={'/cart'}>
            <article className="shopping_cart">
            
              <FiShoppingCart className='shop'/>
              <span className="cart_itemss">
                {totalItems}
              <h4>Cart</h4> 
              </span>
              
            </article>
              </Link>

          </div>



      </div>


    </nav>
  )
}

export default Header
