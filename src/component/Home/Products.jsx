import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link, Outlet } from "react-router-dom";
import './Products.css'



const Product = ({ product }) => {

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: product.ratings,
        isHalf: true,
        size: window.innerWidth < 600 ? 15 : 18

    }


    

    return (
        <div className='product__card'>
            <Link className='productCard' to={`${product._id}`}>
                <img src={product.images[0].url} alt={product.name} />
                <h4>{product.name}</h4>
                <p>{product.description} </p>

                <div>
                    <ReactStars {...options} /> <span>({product.numOfReviews || 0} Reviews)</span>
                </div>
                <span>{`₹${product.price}`}</span>



            </Link>
            <Outlet />
        </div>
    )
}

export default Product