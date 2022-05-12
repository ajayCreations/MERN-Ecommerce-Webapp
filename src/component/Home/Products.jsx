import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link, Outlet } from "react-router-dom";
import './Products.css'

const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value:4.5,
    isHalf:true,
    size:window.innerWidth < 600 ? 15 : 18

}

const Product = ({ product }) => {
    return (
        <div className='product__card'>
            <Link className='productCard' to={product._id}>
                <img src={product.images[0].url} alt={product.name} />
                <p>{product.name} </p>

                <div>
                    <ReactStars {...options} /> <span>(256 Reviews)</span>
                </div>
                <span>{product.price}</span>



            </Link>
            <Outlet />
        </div>
    )
}

export default Product