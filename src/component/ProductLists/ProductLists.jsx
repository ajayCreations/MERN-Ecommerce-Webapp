import React, { useState, useEffect } from 'react'
import './ProductList.css'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Loader from '../layout/loader/Loader';
import ReactStars from 'react-rating-stars-component';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'
import amazonFullfill from '../../assets/images/amazon_fulfill.png'
import { Link } from 'react-router-dom';
import { AiOutlineLeft } from 'react-icons/ai'
import { AiOutlineRight } from 'react-icons/ai'



const ProductLists = () => {

  const AllCategory = [
    { name: "Laptops", active: false },
    { name: "Smartphones", active: false },
    { name: "Headphones", active: false },
    { name: "Smart Watch", active: false },
    { name: "Cloths", active: false },
  ]
  const AllPrice = [
    { name: [1,1000], active: false },
    { name: [1000,5000], active: false },
    { name: [5000,10000], active: false },
    { name: [10000,20000], active: false },
    { name: [20000,300000], active: false },
  ];

  const starRating = [
    { name: 5, active: false },
    { name: 4, active: false },
    { name: 3, active: false },
    { name: 2, active: false },
    { name: 1, active: false },
  ];


  const { keyword } = useParams();

  const [Loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const [productsCount, setProductsCount] = useState(8);
  const [resultPerPage, setResultPerPage] = useState(8);
  const [currentPage, setCurrentPageNo] = useState(1);

  const [category, setCategory] = useState(AllCategory);
  const [priceRange, setPriceRange] = useState(AllPrice);
  const [review, setReview] = useState(starRating);

  const [filter, setFilter] = useState(false);

  const lenghtofProducts = products.length;


  // Remove All Filters
  function removeFilters() {
    let cat = [...category];
    let price = [...priceRange];
    let rev = [...review];

    cat.map((item) => {
      item.active = false;
    })

    price.map((item) => {
      item.active = false;
    })

    rev.map((item) => {
      item.active = false;
    })

    setCategory(value => value = cat);
    setPriceRange(value => value = price);
    setReview(value => value = rev);
    setFilter(value => value = false);

  }


  // Category Filter 
  async function updateCategory(index, item) {
    let temp = [...category];
    temp.map((item) => {
      item.active = false;
    })

    temp[index].active = !item.active;

    try {
      const { data } = await new axios.get(`/api/v1/products?category=${item.name}`)

      setResultPerPage(value => value = data.resultPerPage);
      setProductsCount(v => v = data.searchLength);
      setProducts(value => value = data.products);

    } catch (error) {
      console.log('Error While fetching update category');
    }
    setFilter(value => value = true);
    setCategory(value => value = temp);
  }


  // Price Filter
  async function updatePrice(index, item) {
    let temp = [...priceRange];
    temp.map((item) => {
      item.active = false;
    })
    temp[index].active = !item.active;

    try {
      const { data } = await new axios.get(`/api/v1/products?price[gte]=${item.name[0]}&price[lte]=${item.name[1]}&keyword=${keyword}`)
      setResultPerPage(value => value = data.resultPerPage);
      setProductsCount(v => v = data.searchLength);
      setProducts(value => value = data.products);

    } catch (error) {
      console.log('Error While fetching update price filter');
    }

    setFilter(value => value = true);
    setPriceRange(value => value = temp);
  }


  // Rating Start Filter
  async function updateReview(index, item) {
    let temp = [...review];
    temp.map((item) => {
      item.active = false;
    })
    temp[index].active = !item.active;

    try {
      const { data } = await new axios.get(`/api/v1/products?ratings[gte]=${item.name}&keyword=${keyword}`)
      setResultPerPage(value => value = data.resultPerPage);
      setProductsCount(v => v = data.searchLength);
      setProducts(value => value = data.products);

    } catch (error) {
      console.log('Error While fetching update price filter');
    }

    setFilter(value => value = true);
    setReview(value => value = temp);
  }



  // Fetching Products from Server
  async function GetSearchItem() {
    try {
      setProducts(value => value = []);


      const { data } = await new axios.get(`/api/v1/products?keyword=${keyword}&page=${currentPage}`)

      console.log(keyword, 'The data getting from search is', data);

      setProducts(value => value = data.products);
      setResultPerPage(value => value = data.resultPerPage);
      setProductsCount(v => v = data.searchLength);
      setLoading(v => v = false);

    } catch (error) {
      console.log('Error while fetching the data from server', error);
    }


  }

  const decrement = () => {
    if (currentPage >= 2) {
      setCurrentPageNo(v => v - 1);
    }
  }

  // To count Maximum pagination Page 
  function maxPage() {
    if (productsCount % resultPerPage == 0) {
      return Math.floor(productsCount / resultPerPage);
    } else {
      return Math.floor(productsCount / resultPerPage) + 1;
    }
  }
  let maxlengths = maxPage();


  const increment = () => {
    // console.log('Max length is',maxlengths)
    if (currentPage < maxlengths) {
      setCurrentPageNo(v => v + 1);
    }
  }

  useEffect(() => {
    GetSearchItem();
  }, [keyword,currentPage,filter])


  if (Loading) return <Loader />;
  return (
    <section className="productall_list_main">
      <div className="upper_section">

        <div className="products_filters">

          {filter ? <h3 onClick={() => removeFilters()} style={{ cursor: "pointer" }}>Remove Filter</h3> : null}
          <h3 className='products_filter_heading'>Filter by Category</h3>
          {category.map((item, index) => {
            return (
              <div className="all_category_a1" key={index} onClick={() => updateCategory(index, item, 'category')}>
                <p className='a1_name'>{item.active ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}{item.name}</p>

              </div>
            )
          })}

          <h3 className='products_filter_heading'>Price under</h3>
          {priceRange.map((item, index) => {

            let price=item.name[0];
            price = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            let price2=item.name[1];
            price2 = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            
            return (
              <div className="all_category_a1" key={index} onClick={() => updatePrice(index, item)}>
                <p className='a1_name' style={{ fontWeight: item.active ? "bold" : "initial" }}>₹{item.name[0]} - ₹{item.name[1]}</p>

              </div>
            )
          })}

          <h3 className='products_filter_heading'>Customer Review</h3>
          {review.map((item, index) => {
            const options = {
              edit: false,
              color: "rgba(20,20,20,0.1)",
              activeColor: "orange",
              value: item.name,
              isHalf: true,
              size: window.innerWidth < 600 ? 15 : 20

            }

            return (
              <div className="all_category_a1" key={index} onClick={() => updateReview(index, item)}>
                <p className='a1_name' style={{ fontWeight: item.active ? 'bold' : "initial" }}> <ReactStars {...options} />& up</p>
              </div>
            )
          })}




        </div>

        <div className="product_list_all">
          {lenghtofProducts == 0 ? <h2 style={{ color: "gray" ,margin:"10rem"}}>No result found ! Try another keyword / filter</h2> : null}
          {products.map((item, index) => {
            const options = {
              edit: false,
              color: "rgba(20,20,20,0.1)",
              activeColor: "orange",
              value: item.ratings,
              isHalf: true,
              size: window.innerWidth < 600 ? 15 : 20

            }

            return (
              <Link key={index} to={`/product/${item._id}`}>

                <div className="search_item">
                  <img src={item.images[0].url} alt="" className='list_image1' />
                  <div className='search_item_second'>
                    <p className='line2 search_item_name'>{item.name}</p>

                    <div className="search_side">
                      <ReactStars {...options} />
                      ({item.numOfReviews})
                    </div>
                    <img src={amazonFullfill} alt="fullfill" className='amazon_fulfill' />
                    <p className='p_price'>₹ {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00</p>
                    <p style={{ color: "gray", marginBottom: "50px" }}>Upto 40% Off On Citibank Cards</p>

                    <p style={{ marginBottom: "5px" }}>Get it by Tomorrow, June 9</p>
                    <p> FREE Delivery by Amazon</p>

                  </div>
                </div>
              </Link>
            )
          })}
        </div>


      </div>

      <div className="middle_Section1">

        <div className="middle_section" style={{display:lenghtofProducts==0?"none":"flex"}}>

          
          <div className="navbutton prevPage" onClick={() => decrement()}><AiOutlineLeft /> Previous </div>
          <h4 className='curr_page'>{currentPage}</h4>
          <div className="navbutton nextPage" onClick={() => increment()} style={{ color: maxlengths == currentPage ? "gray" : "black" }}>Next <AiOutlineRight /></div>

        </div>
      </div>

      <div className="lower_section">

      </div>

    </section>
  )
}

export default ProductLists

