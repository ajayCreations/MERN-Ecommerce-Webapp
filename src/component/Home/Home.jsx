import React from 'react'
import { CgScrollV } from 'react-icons/cg'
import './Home.css'
import Product from './Products.jsx'
import MetaData from '../MetaData'
import { getProduct } from '../../redux/actions/productAction'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react'


const product={
  name:"Mac-book pro",
  _id:12,
  images:[{url:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80'}],
  price:"₹92,000"
}

const Home = () => {


  const dispatch = useDispatch();
  
  React.useEffect(() => {
   return dispatch(getProduct());
  }, [dispatch])
  
  return (
    <>
      <MetaData title="Z-Comm"/>
      <section className="banner">
        <p>Welcome to Z-Comm</p>
        <h1>Find Amazing Products Below</h1>

        <a href="#showProducts">
          <button>
            Scroll <CgScrollV />
          </button>
        </a>





      </section>

      <section className="products" id="showProducts">

        <h2>Featur Products</h2>
        <div className="product__list">

        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>

        </div>

      </section>
    </>
  )
}

export default Home