import React,{useEffect,useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import './User.css'
import axios from 'axios';
import App from '../../App';

const User = () => {

    const dispatch=useDispatch();
    const [user,setUser]=useState({name:'Amazon',email:"amazon@amazon.com",avatar:{public_id:"amazon",url:"https://m.media-amazon.com/images/I/61jLiCovxVL._AC_UY327_FMwebp_QL65_.jpg"}});
    

    async function logout(){
        try{
            await axios.get('/api/v1/logout');
            await localStorage.clear();
            alert('Waiting for your ComeBack!');
            window.location.reload();
        }catch(e){
            alert('Try Again Later');
            console.log('Alert while logout');
        }
    }

      async function GetUser(){
        const checkuser = await JSON.parse(localStorage.getItem('checkuser'));
       
        if(checkuser) setUser(v=>v=checkuser);

        dispatch({
            type:"GoToAuth",
            payload:true
          })
      }


      useEffect(() => {
        let start=true;
        if(start){
            GetUser();
        }
      
        return () => {
          start=false;
        }
      }, [])
      


  return (
   <section className="userProfile">
    
    <div className="mainSection">
            
        <div className="uperSection">
        </div>
        <div className="userDetails">
            <div className="user_one">
                <img src={user.avatar.url} alt="" className='user_pic'/>
                <div>
                <p className='profile_name'>{user.name}</p>
                <p className='profile_email'>{user.email}</p>
                
                </div>
            </div>
            <button className='logout_btn' onClick={()=>logout()}>Log Out</button>
        </div>

    </div>
   </section>
  )
}

export default User