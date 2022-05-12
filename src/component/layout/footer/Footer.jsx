import React from 'react'
import icon1 from '../../../assets/images/icon-appstore.png'
import icon2 from '../../../assets/images/googleit.png'
import {AiOutlineInstagram,AiOutlineYoutube,AiOutlineFacebook} from 'react-icons/ai'

import './footer.css'
const Footer = () => {
    return (
        <footer className='footer'>
           



                <div className="left">
                    <h3>Download our app</h3>
                    <img src={icon1} alt="" className='apple'/>
                    <img src={icon2} alt="" />

                </div>

                <div className="center">

                    <h1>Z-Comm</h1>

                 
                    <h4>Best Experience in online shooping</h4>
                    <small>Copyright 2021 &copy; Viboxl</small>
                   

                </div>

                <div className="right">
                    <h3>Follow Us on</h3>
                    <ul className="socials">
                        <li><a href=""><AiOutlineInstagram /></a></li>
                        <li><a href=""><AiOutlineYoutube/></a></li>
                        <li><a href=""><AiOutlineFacebook/></a></li>
                    </ul>
                </div>
            
        </footer>
    )
}

export default Footer 