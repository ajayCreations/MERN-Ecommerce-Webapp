import React,{useEffect,useState} from 'react'
import './SlideCard.css'
import ReactStars from 'react-rating-stars-component';
import { Link, Outlet } from "react-router-dom";
import Slider from 'react-slick'
import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';
import axios from 'axios'

const SlideCard = ({ product=[], categoery=false}) => {

  const [products,setProducts]=useState([]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "gold",
    value: 3,
    isHalf: true,
    size: window.innerWidth < 600 ? 15 : 18

  }



  function SampleNextArrow({ onClick }) {
    return (
      <AiOutlineRight onClick={onClick} className='arrows navigation_arrows_right' />
    );
  }

  function SamplePrevArrow({ onClick }) {
    return (
      <AiOutlineLeft onClick={onClick} className='arrows navigation_arrows' />
    );
  }


  async function SetCardProducts(){
    if(categoery){
      const { data } = await new axios.get(`/api/v1/products?category=${categoery}`).then().catch(e=>alert('Check your internet'))
        console.log('the data is',data)
      setProducts(value => value = data.products);
    }else{
      setProducts(v=>v=product);
    }
  }

  useEffect(() => {
      SetCardProducts();
  }, [])
  

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };



  return (
    <div>

      <Slider {...settings}>
        { (!product?products:product).map((item, index) => {
          return (
            <Link to={`/product/${item._id}`} key={index}>
              <article className='slide_card' >

                <div className='product_pics_space'>
                  <img className='product_pics' src={item.images[0].url} alt="product Image" />
                </div>

                <p className='product_details'>{item.name}</p>
                <div className='product_ratings'><ReactStars {...options} /> <small>{item.numOfReviews}</small></div>
                <h3 className="product_price">₹{item.price}.00</h3>

              </article>
            </Link>

          )
        })}
      </Slider>
    </div>
  )
}

export default SlideCard