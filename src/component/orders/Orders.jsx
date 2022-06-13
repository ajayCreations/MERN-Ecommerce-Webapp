import React from 'react'
import './Orders.css'
import SlideCard from '../layout/cards/SlideCard'

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


const Orders = () => {
  return (
    <section className='order_main'>

      <div className="order_all">
        <div className="order_all_header">
          <h1 className="order_heading">Your Orders</h1>
          <div className="order_header_search">
            <input type="order_search" placeholder='Search all orders' name='search order' className='search_orders'/>
            <button className='order_search_button'>Search Orders</button>
          </div>
        </div>

       

       
      </div>

      <div className="all_order_list">
          {
            productList.map((item,index)=>{
              return (
                <div className="order_product_list" key={index}>
                  <img src={item.images[0].url} alt=""  className='order_images'/>
                  <p className="order_name">{item.name}</p>
                  <p className="order_price">₹{item.price}.00</p>

                  <button className="buy_button">Add to Cart</button>


                </div>
              )
            })
          }
        </div>

        <section>
        <h1 className='cart_slider_heading'>Inspired by your browsing history</h1>
        <SlideCard />
      </section>

    </section>
  )
}

export default Orders