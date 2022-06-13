import React, { useState, useEffect, useDeferredValue } from 'react'
import './Auth.css'
import TopLogo from '../../assets/images/Amazon_logo_black.png';
import { Link, Navigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Loader from '../layout/loader/Loader'

const Login = () => {

  const [see, setSee] = useState(false);
  const dispatch = useDispatch();


  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [loading,setloading]=useState(false);

  
  async function GoLogin() {
    setloading(s=>s=true);
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      if (email && password) {
        const data = await axios.post(`/api/v1/login`, { email, password }, config);
        dispatch({
          type: "LoginUser",
          payload: data.data.user
        })
        
        console.log('Login Successfull', data.data.user)

        alert(`Welcome back ! ${data.data.user.name}`)
        setloading(s=>s=false);
        window.location.reload();

      } else {
        console.log('Please Enter Email or Password');
        alert('Please Enter Email & password')
      }

    } catch (error) {
      console.log('Error While Login', error,error.message,error.response.data.message);
      alert(`${error.response.data.message}`)
    }
    setloading(s=>s=false);
  }

  const loginUser = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    myForm.set("password", password);
    GoLogin();
  }


  if(loading)return <Loader />
  return (
    <section className="auth login__page">

      <img src={TopLogo} alt="amazon logo" className='top_logo' />

      <div className="signin">
        <h2>Sign-In</h2>

        <form  method='POST' onSubmit={(e) => loginUser(e)}>
          <h4>Enter your email</h4>
          <input type="email" className='formInput' name='email' onChange={(e)=>setEmail(v=>v=e.target.value)}  contentEditable={true}/>

          <h4>Password</h4>
          <input type={see ? "text" : "password"} className='formInput' name='password' onChange={(e)=>setPassword(v=>v=e.target.value)} contentEditable={true} />

          <div className="forgot_section">
            <h5 className='show' onClick={() => setSee(v => v = !v)}>{see ? "Hide password" : 'Show password'}</h5>
            <Link to={'/password/forgot'}><h5 className='show'>Forgot password?</h5></Link>
          </div>
          <button className="submit" type='submit'>Sign In</button>

          <small>By continuing, you agree to Amazon's <Link to={'/condition'}>Conditions of Use </Link> and <Link to={'/privacy'}>Privacy Notice.</Link></small>

        </form>

      </div>

      <div className="sign_up">
        <h5 className="new">New to Amazon?</h5>

        <Link to={'/register'}>
          <div className='register_btn'>
            <button className="register">Create your Amazon account</button>
          </div>
        </Link>
      </div>

      <div className="help">
        <div className='help_list'>
          <a href="#">Conditions of Use</a>
          <a href="#">Privacy Notice</a>
          <a href="#">Help</a>
        </div>

        <small>© 1996-2022, Amazon.com, Inc. or its affiliates</small>

      </div>



    </section>
  )
}

export default Login