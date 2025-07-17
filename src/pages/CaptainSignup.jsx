import { Form, Formik } from 'formik';
import React from 'react';
import { Link,useNavigate } from 'react-router-dom'
import { captainRegisterSchema } from '../validations/captain.register.validate';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../reducers/auth/async';
import { showToast } from '../utils';
import { PARAMS } from '../utils/const/Global';

const CaptainSignup = () => {

    const dispatch = useDispatch();


    const navigate = useNavigate();

    const handleSubmit = (values) => {

      dispatch(registerThunk(
        {
        fullname: {
          firstname: values.first_name,
          lastname: values.last_name
        },
        email: values.email,
        password: values.password,
        phone  : values.phone,
        role   : PARAMS.CAPTAIN,
        vehicle : {
          color : values.color,
          plate : values.plate,
          capacity : values.capacity,
          vehicleType : values.vehicleType
        }
      })).unwrap()
          .then((res) => {
            showToast({ type: 'success', message: 'Captain register successful!' });
            navigate('/captain-home');
           
          })
          .catch((err) => {
            
            showToast({ type: 'error', message: err});
          })

    }
    return (
        <div className='py-5 px-5 h-screen flex flex-col justify-between'>
        <div>
          <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
          <Formik
          validationSchema={captainRegisterSchema}
          onSubmit={handleSubmit}
          initialValues={
            {
              first_name : "",
              last_name  : "",
              email      : "",
              phone      : "",
              password   : "",
              color      : "",
              plate      : "",
              capacity   : "",
              vehicleType : ""
            }
          }
          >
            {({errors, handleChange, handleBlur, values,touched }) => (
          <Form>
  
            <h3 className='text-lg w-full  font-medium mb-2'>What's our Captain's name</h3>
            <div className='flex gap-4 mb-7'>
              <input
                
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                type="text"
                placeholder='First name'
                name = 'first_name'
                onChange={handleChange}
                onBlur={handleBlur}
                value = {values.first_name}
               
              />
              {touched.first_name && errors.first_name &&(
                <div className='error'>{errors.first_name}</div>
              )}
              <input
                
                className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                type="text"
                placeholder='Last name'
                value={values.emalast_namel}
                onChange={handleChange}
                onBlur={handleBlur}
                name = "last_name"
              />
              {touched.last_name && errors.last_name &&(
                <div className='error'>{errors.last_name}</div>
              )}
            </div>
  
            <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
            <input
              
              
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              type="email"
              placeholder='email@example.com'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              name = "email"
            />
             {touched.email && errors.email &&(
                <div className='error'>{errors.email}</div>
              )}
              <h3 className='text-lg font-medium mb-2'>What's your phone</h3>
            <input
              
              
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              type="text"
              placeholder='8766545567'
              name="phone"
              value = {values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete='phone'
            />
            {
              touched.phone && errors.phone && (
                <div className='error'>{errors.phone}</div>
              )
            }
            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
  
            <input
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
             
               type="password"
              placeholder='password'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              name = "password"
            />
            {touched.password && errors.password &&(
                <div className='error'>{errors.password}</div>
              )}
            <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
            <div className='flex gap-4 mb-7'>
              <input
                
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                type="text"
                placeholder='Vehicle Color'
                name = "color" 
                onChange={handleChange}
                onBlur={handleBlur}
                value = {values.color}
              />
               {
                errors.color && touched.color && (
                  <div>{errors.color}</div>
                )
               } 
              <input
                
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                type="text"
                placeholder='Vehicle Plate'
                onChange={handleChange}
                onBlur={handleBlur}
                name = "plate"
                value = {values.plate}

              />
                {
                errors.plate && touched.plate && (
                  <div>{errors.plate}</div>
                )
               } 
            </div>
            <div className='flex gap-4 mb-7'>
              <input
                
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                type="number"
                placeholder='Vehicle Capacity'
                onChange={handleChange}
                onBlur={handleBlur}
                name = "capacity"
                value = {values.capacity}
                
              />
               {
                errors.capacity && touched.capacity && (
                  <div>{errors.capacity}</div>
                )
               } 
              <select
                
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                onChange={handleChange}
                onBlur={handleBlur}
                name = "vehicleType"
              >
                <option value="" disabled>Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
              {
                errors.vehicleType && touched.vehicleType && (
                  <div>{errors.vehicleType}</div>
                )
               } 
            </div>
  
            <button type='submit'
              className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
            >Create Captain Account</button>
  
          </Form>
          )}
          </Formik>
          <p className='text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
        </div>
        <div>
          <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
      </div>
    )
}

export default CaptainSignup;