import React, { useEffect, useState } from 'react'
import './Home.css'
import MetaData from '../MetaData'
import Loader from '../layout/loader/Loader'
import banner from '../../assets/images/amazon_banner.png';
import ProductComponent from '../Product/ProductComponent'
import SlideCard from '../layout/cards/SlideCard'
import { ProductAction } from '../../redux/actions/ProductActions';
import { useDispatch,useSelector } from 'react-redux';
import  axios  from 'axios';


const Home =()=>{

  const dispatch=useDispatch();
  const [loading,setLoading] = useState(true);
  const [products,setProduct] = useState([]);

   const GettingProducts = async()=> {
    const {data} = await axios.get('/api/v1/products')

    dispatch({
      type:"GetAllProducts",
      payload:data.products
    });
    dispatch({
      type:"GoToAuth",
      payload:true
    })
    setLoading((state)=>state=false);
    setProduct((value)=>value=data.products);
   
  }

  

  useEffect(()=>{
    let load = true;
    if(load){
      GettingProducts();
    }
    return function cleanup(){
      load = false;
    }

  },[])

  if (loading) return <Loader />;

  return (
    <section className="home">
       <MetaData title="Amazon" />
       
      <img src={banner} alt="banner" className='home__banner' />

   
      <div className="home_row">
        <ProductComponent product={products[0]}/>
        <ProductComponent product={products[1]}/>
        <ProductComponent product={products[2]}/>

      </div>

      <div className="top_slider">
      <h1 style={{color:"black"}}>Top picks for you </h1>
       <SlideCard product={false} categoery='Laptops'/>
      </div>

      <div className="home_row">
        <ProductComponent product={products[3]}/>
        <ProductComponent product={products[4]}/>
        <ProductComponent product={products[4]}/>

      </div>

      <div className="top_slider">
      <h1 style={{color:"black"}}>Products you might like </h1>
       <SlideCard product={products}/>
      </div>


    </section>
  )
}

export default Home;
