import React,{useState,useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Formik,Form } from 'formik'
import {loginValidation} from '../validations/login.validate';
import { useDispatch,useSelector } from "react-redux";
import Spinner from '../components/spinner'
import { loginThunk,loginFacebookThunk } from '../reducers/auth/async'
import { showToast } from '../utils';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';

const UserLogin = () => {

  const [userAccess,setUserAccess]   = useState("");

  const navigate = useNavigate();

  const accessTokenRef = useRef(null);
  
  const { loading} = useSelector(
    (state) => state.auth
  )

  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(loginThunk(values)).unwrap()
    .then((res) => {
      showToast({ type: 'success', message: 'Login successful!' });
      navigate('/captain-home');
     
    })
    .catch((err) => {
      
      showToast({ type: 'error', message: err});
    });
  }

  const handleSubmitFacebook = (res) => {
   
    setUserAccess(res.accessToken);

    const accessToken = res.accessToken;

    accessTokenRef.current = accessToken;
  }

  const handleProfileFacebook = (res) => {

    const accessToken = accessTokenRef.current;

    const data = {
      name  :  res.name,
      email : res.email,
      pic   : res.picture.data.url,
      access_token : accessToken,
      faceBookId : res.id
    }

    
    dispatch(loginFacebookThunk(data))
    .then((res) => {
      showToast({ type: 'success', message: 'Login successful!' });
      navigate('/captain-home');
    
    })
    .catch((err) => {
      
      showToast({ type: 'error', message: err});
    });
    
  }

  const handleSubmitGoogle = (res) => {

    const jwtDecodedata = (jwtDecode(res.credential))

    const data = {
      firstname  :  jwtDecodedata.given_name,
      lastname  :  jwtDecodedata.family_name,
      email : jwtDecodedata.email,
      pic   : jwtDecodedata.picture,
      access_token : res.credential,
      faceBookId : jwtDecodedata.nbf
    }

    
  }

  
  
  

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />
        <Formik
        initialValues={{
          email : "",
          password : ""
        }}
        validationSchema={loginValidation}
        onSubmit={handleSubmit}
        >
          {({values, handleChange, handleBlur, errors, touched, setFieldValue}) => (

         
        <Form>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
            onChange={handleChange}
            onBlur={handleBlur}
            value = {values.email}
            name = "email"
            autoComplete ="email"
          />
          {touched.email && errors.email && (
            <div className='error'>{errors.email }</div>
          )}
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            onChange={handleChange}
            onBlur={handleBlur}
            value = {values.password}
            type="password"
            placeholder='password'
            name = "password"
            autoComplete ="current-password"
          />
            {touched.password && errors.password && (
              <div className='error'>{errors.password}</div>
            )}
          <button type="submit" 
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
            disabled={loading}>{loading ? <Spinner /> : 'Login'}</button>

        </Form>
         )}
        </Formik>
        <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
      </div>
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        
        fields="name, email, picture"
        scope="public_profile,email"
        onSuccess={(response) => {
          handleSubmitFacebook(response);
        }}
        onFail={(error) => {
          console.log('Login Failed!', error);
        }}
        onProfileSuccess={(response) => {
          handleProfileFacebook(response);
        }}
        render={({ onClick }) => (
          <button
            onClick={onClick}  
            className="bg-[#1877F2] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
          >
            <i className="ri-facebook-fill mr-2"></i>
            Continue with Facebook
          </button>
        )}
      />
      {/* <a className="bg-white text-gray-700 border border-gray-300 font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg flex items-center justify-center placeholder:text-base">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 mr-2" alt="Google logo"/>
        Continue with Google
      </a> */}
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
          console.log(jwtDecode(credentialResponse.credential))
          handleSubmitGoogle(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        render={({ onClick }) => (
          <button
            onClick={onClick}  
            className="bg-white text-gray-700 border border-gray-300 font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg flex items-center justify-center placeholder:text-base"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 mr-2" alt="Google logo"/>
            Continue with Google
          </button>
        )}
      />
      <div>
        <Link
          to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin