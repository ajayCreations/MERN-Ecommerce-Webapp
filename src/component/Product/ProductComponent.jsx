import React from 'react'
import './ProductComponent.css'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component';

const ProductComponent = ({ product }) => {

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "orange",
        value: product.ratings,
        isHalf: true,
        size: window.innerWidth < 600 ? 15 : 18
    
    }
    return (
     
        <div className="product__Card">

                
                <p className='product__title'>{product.name}</p>
                <p className='price'>₹{product.price}.00</p>
                <p className='ratings1'><ReactStars {...options}/> {product.numOfReviews}</p>
                <div className='this_one'>
                    <img src={product.images[0].url} alt="Product Image" className='product_img' />
                </div>

  
            </div>
        
    )
}

export default ProductComponent