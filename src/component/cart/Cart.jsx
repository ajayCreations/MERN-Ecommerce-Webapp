import React, { useState, useEffect } from 'react'
import './Cart.css'
import amazonFullfill from '../../assets/images/amazon_fulfill.png'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'
import SlideCard from '../layout/cards/SlideCard'
import { useDispatch, useSelector } from 'react-redux'
const productList =
  [
    {
      name: "Yellow Chimes Rings for Men 2 Pcs Combo Dragon Celtic Inlay Polish Finish Titanium Steel Black/Blue Rings for Men & Boys.Yellow Chimes Rings for Men 2 Pcs Combo Dragon Celtic Inlay Polish Finish Titanium Steel Black/Blue Rings for Men & Boys.",
      images: [
        {
          url: `https://m.media-amazon.com/images/I/61PGRfoJCZL._AC_AA360_.jpg`
        }
      ],

      price: 249.00,
      Stock: 2
    },
    {
      name: "boAt Bassheads 225 in Ear Wired Earphones with Mic(Black)boAt Bassheads 225 in Ear Wired Earphones with Mic(Black)",
      images: [
        {
          url: `https://m.media-amazon.com/images/I/61iSV4o+X-L._AC_AA360_.jpg`
        }
      ],
      price: 699.00,
      Stock: 2

    },

    {
      name: "HP Z3700 USB Wireless Mouse (Silver)",
      images: [
        {
          url: `https://m.media-amazon.com/images/I/61JJAJc+MgL._AC_AA360_.jpg`
        }
      ],
      price: 1075.00,
      Stock: 2

    },
    {
      name: `Lenovo ThinkBook 14 Intel Core i5 11th Gen 14" (35.56cm) FHD IPS Thin & Light Laptop (16GB RAM/512GB SSD/Windows 11 Home/MS Office 2021/FPR/Intel Iris Xe Graphics Mineral Grey/1.4 kg), 20VDA0TLIHLenovo ThinkBook 14 Intel Core i5 11th Gen 14" (35.56cm) FHD IPS Thin & Light Laptop (16GB RAM/512GB SSD/Windows 11`,
      images: [
        {
          url: `https://m.media-amazon.com/images/I/61Dw5Z8LzJL._AC_AA360_.jpg`
        }
      ],
      price: 59910.00,
      Stock: 2

    },


  ]


const Cart = () => {

  const [products, setProducts] = useState(productList);
  const [seenProducts, setSeenProducts] = useState([]);

  let totalCost = 0;
  let totalItems = products.length;

  const data = useSelector(state => state.Product.cartProducts);
  console.log('The cart Product is',data);

  async function SetCart() {

    let seeproducts = await JSON.parse(localStorage.getItem('productHistory'));
    console.log('Seen Products are',seeproducts)
     setSeenProducts(value => value = seeproducts);


    if (totalItems > 0)
      setProducts(value => value = data);
      
  }


  useEffect(() => {
    let start = true;
    if (start) {
      SetCart();
    }
    return function Cleanup() {
      start = false;
    }
  }, [data])
  
  return (
    <>

      <section className="cart_one">


        <div className="cart_products">
        
       
          <div className="cart_style cart_section">

            <div className="cart_above">
              <h1>Shopping Cart</h1>
              <h1>Price</h1>
            </div>
            
            {products.map((item, index) => {
              totalCost += item.price;

              return (
                <div className="cart_items" key={index}>

                  <div className="cart_images">
                    <img src={item.images[0].url} alt="products" className='cart_image' />
                  </div>

                  <div className='cart_item_details'>
                    <p className="cart_item_names">{item.name}</p>
                    {item.Stock >= 1 ? (
                      <small style={{ color: 'green' }}>In stock</small>
                    ) : (
                      <small style={{ color: 'red' }}>Out of stock</small>
                    )}


                    <div>
                      <div className='freeShip'>{item.price >= 500 ? <small>Eligible for Free Shipping</small> : null}</div>
                      <img src={amazonFullfill} alt="fullfill" className='amazon_fulfill' />
                    </div>
                  </div>

                  <div className="cart_price">
                    <h3>₹{item.price}</h3>
                  </div>


                </div>
              )
            })}





          </div>

          <div className="cart_style cart_checkout">

            {totalCost > 499 ? (
              <small className='free_bar'> <AiFillCheckCircle /> Part of your order qualifies for FREE Delivery.</small>
            ) : (
              <small className='free_bar_no'> <AiFillCloseCircle /> Cart above ₹499 is eligible for FREE Delivery.</small>
            )}
            <p className='subtotal'>Subtotal ({totalItems} items) : <span className='total_price'>₹{totalCost}.00</span> </p>
            <button className='buy_button'>Proceed to Buy</button>
          </div>


        </div>


        <small className='footer_note'>The price and availability of items at Amazon.in are subject to change. The shopping cart is a temporary place to store a list of your items and reflects each item's most recent price.

          Do you have a promotional code? We'll ask you to enter your claim code when it's time to pay.</small>
      </section>

      {seenProducts != null ? (
        <section>
          <h1 className='cart_slider_heading'>Inspired by your browsing history</h1>
          <SlideCard product={seenProducts} />
        </section>
      ) : null}

    </>
  )
}

export default Cart