import React from 'react'
import './footer.css'
import amazonlogo from '../../../assets/images/amazon_logo.png';

const getToKnow=[
    {title:'About Us',link:''},
    {title:'Carerrs',link:''},
    {title:'Press Releases',link:''},
    {title:'Amazon Cares',link:''},
    {title:'Gift a Smile',link:''},
    {title:'Amazon Science',link:''},
]

const connectWithUs=[
    {title:'Facebook',link:''},
    {title:'Twitter',link:''},
    {title:'Instagram',link:''}
]


const makeMoneyWithus=[
    {title:'Sell on Amazon',link:''},
    {title:'Sell under Amazon Accelerator',link:''},
    {title:'Amaozon Global Selling',link:''},
    {title:'Became an Affiliate',link:''},
    {title:'Fulfilment by Amazon',link:''},
    {title:'Advertise Your Products',link:''},
    {title:'Amazon Pay on Merchants',link:''},
]


const letUsHelpYou=[
    {title:'COVID-19 and Amazon',link:''},
    {title:'Your Account',link:''},
    {title:'Returns Center',link:''},
    {title:'100% Purchase Protection',link:''},
    {title:'Amazon App Download',link:''},
    {title:'Amazon Assistant Download',link:''},
    {title:'Help',link:''},
]

const Footer = ()=>{

    return (
        <div className='main_footer'>

         <div className='goToTop'>
            <a href='#'><h4>Back To Top</h4></a>
         </div>
      
        <footer>
            <article>
                <h3>Get to Know Us</h3>
                {getToKnow.map((item,i)=>{
                    return <a href='#' key={i}><p>{item.title}</p></a>
                })}
            </article>


            <article>
            <h3>Connect with Us</h3>
                {connectWithUs.map((item,i)=>{
                    return <a href='#' key={i}><p>{item.title}</p></a>
                })}
            </article>


            <article>
            <h3>Make Money with Us</h3>
                {makeMoneyWithus.map((item,i)=>{
                    return <a href='#' key={i}><p>{item.title}</p></a>
                })}
            </article>

            <article>
            <h3>Let Us Help You</h3>
                {letUsHelpYou.map((item,i)=>{
                    return <a href='#' key={i}><p>{item.title}</p></a>
                })}
            </article>

        </footer>
        <div className='amazon_footer_logo'>
                <img src={amazonlogo} alt="" />
        </div>
        
        </div>
    )

}

export default Footer;
