import React, { useState } from 'react';
import './Auth.css';
import TopLogo from '../../assets/images/Amazon_logo_black.png';
import axios from 'axios';
import Loader from '../layout/loader/Loader';


const ForgotPassword = () => {

  const [view, setView] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(0);
  const [password, setPassword] = useState('');
  const [see, setSee] = useState(false);
  const [confirm, setConfirm] = useState('');
  const [loader, setLoader] = useState(false);

  const config = { headers: { "Content-Type": "application/json" } };



  async function SendRequest(value) {

    try {
      setLoader(v=>v=true);
      const data = await axios.post(`/api/v1/password/otp/reset`,value,config);
      alert(`Password Changed Successfull !`, data);
      setLoader(v=>v=false);
      window.location.reload();
    } catch (e) {
      console.log('Error While Sending Forgot request', e);
      alert('Something went wrong ! Try again later.');
      setLoader(v=>v=false);

    }
  }


  const registerSubmit = (e) => {
    e.preventDefault();

    if (password == confirm) {
      const myForm = new FormData();
      myForm.set("otp", otp);
      myForm.set("password", password);
      myForm.set("confirmPassword", confirm);
      console.log('Signup Form Submitted');
      SendRequest(myForm);

    } else {
      alert('Password Mismatched')
    }

  }

  async function SendMail(e) {
    e.preventDefault();

    if (email) {
      setLoader(v=>v=true);
      
      const myForm = new FormData();
      myForm.set("email", email);

      try {
        const data = await axios.post(`/api/v1/password/forgot`, myForm, config)
        console.log('after sending email', data);
        setView(v=>v=true);
        setLoader(v=>v=false);

      } catch (e) {
        setLoader(v=>v=false);
        console.log(`Error While Sending Email`, e);
        alert('Error While Sending Email !');

      }
    } else {
      alert('Email cannot be empty!');
    }

  }

  function passwordAssist() {
    return (
      <section className="auth login__page">

        <img src={TopLogo} alt="amazon logo" className='top_logo' />
        <div className="signin">
          <h2>Reset password assistance</h2>
          <p>Enter the Otp that you've received on your registerd email</p>

          <form method='POST' onSubmit={(e) => registerSubmit(e)}>
            <h4>Enter OTP</h4>
            <input type="number" className='formInput' name='otp' onChange={(e) => setOtp(v => v = e.target.value)} contentEditable={true} maxLength="10" />

            <h4>Password</h4>
            <input type={see ? "text" : "password"} className='formInput' name='password' onChange={(e) => setPassword(v => v = e.target.value)} contentEditable={true} />
            <h4>Password again</h4>
            <input type={see ? "text" : "password"} className='formInput' name='confirmPassword' onChange={e => setConfirm(v => v = e.target.value)} contentEditable={true} />
            <div className="forgot_section">
              <h5 className='show' onClick={() => setSee(v => v = !v)}>{see ? "Hide password" : 'Show password'}</h5>
            </div>


            <button className="submit" type='submit'>Change Password</button>
          </form>
        </div>
      </section>
    )
  }
  if (loader) return <Loader />
  if (view) return passwordAssist();
  return (
    <section className="auth login__page">

      <img src={TopLogo} alt="amazon logo" className='top_logo' />
      <div className="signin">
        <h2>Password assistance</h2>
        <p>Enter the registered email address associated with your Amazon Account.</p>

        <form method='POST' onSubmit={(e)=>SendMail(e)}>
          <h4>Enter your email</h4>
          <input type="email" className='formInput' name='email' onChange={(e) => setEmail(v => v = e.target.value)} contentEditable={true} />

          <button className="submit" type='submit' onSubmit={() => SendMail()}>Send Otp</button>
        </form>

        <p className='forgot_lmsg'>Has your email address or mobile hone number changed?</p>
        <p>If you no longer use the e-mail address associated with your Amazon account, you may contact <a href='https://www.amazon.in/gp/help/customer/account-issues/ref=ap_cs_forgot_pwd?ie=UTF8'>Customer Service</a> for help restoring access to your account.</p>
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

export default ForgotPassword