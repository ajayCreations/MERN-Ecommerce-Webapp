import React, { useEffect, useState, useLayoutEffect } from 'react'
import './ProductDetails.css'
import Loader from '../layout/loader/Loader'
import ReactStars from 'react-rating-stars-component';
import amazonFullfill from '../../assets/images/amazon_fulfill.png'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import SlideCard from '../layout/cards/SlideCard';


const amazonFeatures = [
    { name: 'Pay on Delivery', url: 'https://images-na.ssl-images-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-cod._CB485937110_.png' },
    { name: '10 Days Returns', url: 'https://images-na.ssl-images-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB484059092_.png' },
    { name: 'Amazon Delivered', url: 'https://images-na.ssl-images-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-amazon-delivered._CB485933725_.png' },
    { name: '1 Year Warranty', url: 'https://images-na.ssl-images-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-warranty._CB485935626_.png' },
]



const ProductDetails = () => {


    const { id } = useParams();
    const dispatch = useDispatch();
    const cartProducts = useSelector(state => state.Product.cartProducts);
    const [loading, setloading] = useState(true);
    const [fimage, setfimage] = useState('https://m.media-amazon.com/images/I/719ic9JoBYL._SY741_.jpg');
    const [product1, setProduct1] = useState([]);
    const [ratingArray, setRatingArray] = useState([]);
    const [cart, setCart] = useState(cartProducts);

    const [review, setReview] = useState('');
    const [ratings, setRatings] = useState(1);
    const [categoery,setCategory]=useState('Laptops');
    const data = useSelector(state => state.Auth);

    const totalReviews = product1.numOfReviews;

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "orange",
        value: product1.ratings,
        isHalf: true,
        size: window.innerWidth < 600 ? 15 : 20

    }
    const config = { headers: { "Content-Type": "application/json" } };
    
    const WriteReview = async () => {

        if (Object.keys(data.user).length === 0)
         return alert('Please Login to write reviews !');
        if (!review) 
        return alert('Review Cannot be empty');

        const value = { productId:id, comment: review, rating: ratings };
        await axios
        .put('/api/v1/review', value, config)
        .then(() => {
            alert('Comment Added successuflly');
            window.location.reload();

        }).catch((e) => {
            console.log('Error while updating comment', e);
            alert('Something Went wrong ! Try Later');
        })



    }


    const RatingGraph = (star, value = 0) => {
        return (

            <div className="rating_graph_a1" style={{
                display: "flex",
                marginTop: "20px",
            }}>
                <p className='rating_star1'>{star} star</p>
                <div className="graphy_one"
                    style={{

                        width: `${value * 2}px`,
                        backgroundColor: "orange",
                        borderTopLeftRadius: "5px",
                        borderBottomLeftRadius: "5px",

                    }}
                >

                </div>
                <div className="graphy_two"
                    style={{
                        width: `${200 - value * 2}px`,
                        backgroundColor: "#dbdbdb",
                        borderTopRightRadius: "5px",
                        borderBottomRightRadius: "5px",
                        borderRadius: `${value == 0 ? 5 : null}px`

                    }}
                ></div>
                <p className='ratings_star2'>{value}%</p>
            </div>
        )
    }


    const stockValue = () => {
        if (product1.Stock <= 3) {
            return <h4 style={{ color: 'red' }}>Only {product1.Stock} left</h4>
        } else {
            return <h4 style={{ color: 'green' }}>In stock</h4>
        }
    }

    async function GettingSingleProduct() {
        dispatch({
            type: "GoToAuth",
            payload: true
        })

        const { data } = await axios.get(`/api/v1/product/${id}`);
        let value = data.product;
        console.log(value)
        // setting up the visited products in local storage. 
        // localStorage.clear();
        
        let getFromLocal = await JSON.parse(localStorage.getItem('productHistory'));
        console.log('Product Getting fro local Storeage', getFromLocal, 'And product is', getFromLocal);
        
       
        //setting up 10 recent visited item in local storage 

        if (getFromLocal == null) {
            let value2 = [];
            value2.push(value);
            localStorage.setItem('productHistory', JSON.stringify(value2));
            console.log('Product Not Present in Local Storage');
        }
        else if (getFromLocal.length <= 10) {

            let check = getFromLocal.filter((item) => item._id == value._id)
            if (check.length == 0) {

                getFromLocal.push(value);
                localStorage.setItem('productHistory', JSON.stringify(getFromLocal));
                console.log('Product Not Present in Local Storage');
            } else {
                console.log('Already Present In local Storage')
            }

        } else {
            getFromLocal.push(value);
            getFromLocal.shift();
            localStorage.setItem('productHistory', JSON.stringify(getFromLocal));
        }


        let svalue = value.numOfReviews == 0 ? 0 : 1;
        for (let i = 1; i <= 5; i++) {

            if (svalue != 0) {

                let pvalue = Math.floor(((value.reviews.filter(value => value.rating == i).length) / value.numOfReviews) * 100);
                setRatingArray(ratingArray => [...ratingArray, pvalue]);
                // console.log('the percentage value is', pvalue, ratingArray[i])
            } else {
                setRatingArray(ratingArray => [...ratingArray, 0]);
            }
        }

        setfimage(v => v = value.images[0].url);
        setProduct1(v => v = value);
        setloading(value => value = false);
        setCategory(v=>v=value.category);
    }

    useEffect(() => {
        GettingSingleProduct();
    }, [id])


    function AddToCart() {
        setCart(value => value = [...cart, product1])
        dispatch({
            type: "AddToCart",
            payload: cart
        })
    }


    if (loading) return <Loader />;
    return (
        <div>
            <section className="product_details_one">

                <section className="product_top_section">
                    <div className="image_slides">
                        {product1.images.map((item, index) => {
                            return (
                                <div className="product_images_mini"
                                    onClick={() => setfimage(item.url)}
                                    onMouseOver={() => setfimage(item.url)}
                                    key={index}
                                >
                                    <img src={item.url} alt="side carusole" className='product_images_small' />
                                </div>
                            )
                        })}

                    </div>

                    <div className="product_image">
                        <img src={fimage} alt="Product Image" className='product_focus_image' />
                    </div>

                    <div className="product_details_1">
                        <p className='line3 product_details_name'>{product1.name}</p>
                        <div className='total_reviews'>
                            <ReactStars {...options} />
                            <small className='total_r'>({product1.numOfReviews}) reviews</small>
                        </div>

                        <div className="product_price_single">
                            <p className="single_product_price">M.R.P.: ₹{product1.price}</p>
                            <img src={amazonFullfill} alt="" className='amazon_fulfill2' />
                        </div>
                        <p className="emi">EMI starts at ₹494. No Cost EMI available </p>

                        <div className="amazon_features_icons">
                            {amazonFeatures.map((item, index) => {
                                return (
                                    <div className="amazon_f1" key={index}>
                                        <img src={item.url} alt="" className='icons_pics_a1' />
                                        <small>{item.name}</small>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="about_this_item">
                            <h3 className='about_this_item_heading'>About this item</h3>
                            <p className='about_this_item_1'>{product1.description}</p>

                        </div>

                    </div>


                    <div className="product_buy">
                        {product1.price > 499 ? (
                            <small className='free_bar'> <AiFillCheckCircle />Product is Eligible for FREE Delievery</small>
                        ) : (
                            <small className='free_bar_no'> <AiFillCloseCircle /> Price above ₹499 is eligible for FREE Delivery.</small>
                        )}

                        <div className='product_stock_2'>{stockValue()}</div>
                        <img src={amazonFullfill} alt="" className='amazon_fulfill2' />
                        <div className="product_buttons">
                            <button className='buy_button' onClick={() => AddToCart()}>Add to Cart</button>
                            <button className='buy_button2'>Buy Now</button>
                        </div>

                    </div>



                </section>

                <section className='related_products'>
                <h1 className='single_product_heading'>Related products with free delivery on eligible orders</h1>
                <SlideCard categoery={categoery} product={false}/>
            </section>



                <section className="product_reviews">
                    <h1 className='single_product_heading'>Customer reviews </h1>


                    <div className="product_review2">


                        <div className="single_product_reviews">
                            <div className="single_product_1">
                                <ReactStars {...options} />
                                <p className='rrrs'>{product1.ratings} out of 5</p>
                            </div>
                            <p className='product_reviews_total1'>{totalReviews} global ratings</p>

                            <div className="ratings_graph">
                                {RatingGraph(5, ratingArray[4])}
                                {RatingGraph(4, ratingArray[3])}
                                {RatingGraph(3, ratingArray[2])}
                                {RatingGraph(2, ratingArray[1])}
                                {RatingGraph(1, ratingArray[0])}
                            </div>

                        </div>


                        <div className="product_reviews_list">

                            <div className="writing_product_review">
                                <h2>Rate this product</h2>
                                <ReactStars
                                    edit={true}
                                    color={"rgba(20,20,20,0.1)"}
                                    activeColor={"orange"}
                                    isHalf={false}
                                    onChange={e=>setRatings(v=>v=e)}
                                    size={window.innerWidth < 600 ? 16 : 20} />
                                <textarea type="text" name='review' className='text_input_review' placeholder='Write your product experience ! '
                                    maxLength={500}
                                    cols="100" rows="5"
                                    contentEditable={true}
                                    onChange={e=>setReview(v=>v=e.target.value)}

                                ></textarea>
                                <button className='buy_button one_review' onClick={()=>WriteReview()}>Submit Review</button>
                            </div>

                            {product1.reviews.length == 0 ? (<h3 style={{ color: "gray" }}>No reviews yet. Be the first to write review</h3>) : null}
                            {product1.reviews.map((item, index) => {
                                return (
                                    <div className="all_reviews_bu" key={index}>

                                        <div className="about_review_user">
                                            <img src="https://images-eu.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png" alt="user pics" className='user_pics_r' />
                                            <p>{item.name}</p>
                                        </div>
                                        <ReactStars
                                            edit={false}
                                            color={"rgba(20,20,20,0.1)"}
                                            activeColor={"orange"}
                                            value={item.rating}
                                            isHalf={true}
                                            size={window.innerWidth < 600 ? 13 : 16}
                                        />

                                        <p className='review_comment'>{item.comment}</p>

                                    </div>
                                )
                            })}

                        </div>
                    </div>


                </section>

            </section>
        </div>


    )
}

export default ProductDetails




