import React, { useState } from 'react'
import './Auth.css'
import TopLogo from '../../assets/images/Amazon_logo_black.png';
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import Loader from '../layout/loader/Loader'
import profilePic from '../../assets/images/Profile.png'
import { useDispatch } from 'react-redux';
const Signup = () => {

  const [see, setSee] = useState(false);
  const dispatch=useDispatch();
  const [avatar, setAvatar] = useState(profilePic);
  const [avatarPreview, setAvatarPreview] = useState(profilePic);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setloading] = useState(false);


  async function RegisterUser(myForm) {
    setloading(s => s = true);
    const config = { headers: { "Content-Type": "mulipart/form-data" } };
    try {
      if (email) {
        const data = await axios.post(`/api/v1/register`, myForm, config)
       
        console.log('Trying to submit data');
        dispatch({
          type: "LoginUser",
          payload: data.data.user
        })
        
        setloading(s => s = false);
        alert(`Signup Successfull ! `);
        window.location.reload();
        
      }
    } catch (error) {
      alert('Error occured while registering user', error)
      setloading(s => s = false);
    }

  }


  const registerSubmit = (e) => {
    e.preventDefault();

    if (password == confirm) {
      const myForm = new FormData();
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("password", password);
      myForm.set("avatar", avatar);
      console.log('Signup Form Submitted');
      RegisterUser(myForm);

    } else {
      alert('Password Mismatched')
    }

  }

  const registerData = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(v => v = reader.result);
          console.log('this is set in image',reader.result)
          setAvatarPreview(v => v = reader.result);
        }
      }

      reader.readAsDataURL(e.target.files[0]);
    }
  }



  if (loading) return <Loader />
  return (
    <section className="auth login__page">

      <img src={TopLogo} alt="amazon logo" className='top_logo' />

      <div className="signin">
        <h2>Create account</h2>

        <form method='POST' onSubmit={(e) => registerSubmit(e)}>
          <h4>Your name</h4>
          <input type="text" className='formInput' name='name' placeholder='First and last name' onChange={e => setName(v => v = e.target.value)} contentEditable={true} />


          <h4>Enter your email</h4>
          <input type="text" className='formInput' name='email' placeholder='example@gmail.com' onChange={e => setEmail(v => v = e.target.value)} contentEditable={true} />

          <h4>Password</h4>
          <input type={see ? "text" : "password"} className='formInput' name='passwords' placeholder='At least 6 characters' onChange={e => setPassword(v => v = e.target.value)}  contentEditable={true} />

          <h4>Password again</h4>
          <input type={see ? "text" : "password"} className='formInput' name='password' onChange={e => setConfirm(v => v = e.target.value)}  contentEditable={true}/>
          <h5 className='show' onClick={() => setSee(v => v = !v)}>{see ? "Hide password" : 'Show password'}</h5>

          <div className="select_image">
            <div>
              <h4 className='profile_image_heading'>Choose Profile Image</h4>
              <img src={avatarPreview} alt="" className='avatar_preview' />
              <input type="file" name='avatar' accept='image/' onChange={registerData} className='profile_avatar' />
            </div>
          </div>

          <button className="submit" type='submit' >Continue</button>



          <small>By continuing, you agree to Amazon's <Link to={'/condition'}>Conditions of Use </Link> and <Link to={'/privacy'}>Privacy Notice.</Link></small>
          <p className='go_back'>Already have an account? <Link to={'/login'}>Sign in</Link> </p>

        </form>

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

export default Signup