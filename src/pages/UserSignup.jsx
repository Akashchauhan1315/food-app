import { Form, Formik } from 'formik';
import React from 'react';
import { Link,useNavigate } from 'react-router-dom'
import { registerSchema } from '../validations/register.validate';
import { useDispatch,useSelector } from 'react-redux';
import Spinner from '../components/spinner';
import { registerThunk } from '../reducers/auth/async'
import { showToast } from '../utils';


const UserSignup = () => {

  const { loading} = useSelector(
    (state) => state.auth
  )

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
        phone  : values.phone
      }
    )).unwrap()
    .then((res) => {
      showToast({ type: 'success', message: 'register successful!' });
      
    })
    .catch((err) => {
      
      showToast({ type: 'error', message: err});
    });
  }


    return (
        <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />
          <Formik
          initialValues={{
            first_name : "",
            last_name  : "",
            email      : "",
            password   : "",
            phone      : ""
          }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
          >
            {({ errors, handleChange, handleBlur, values,touched  }) => (
          <Form>

            <h3 className='text-lg w-1/2  font-medium mb-2'>What's your name</h3>
            <div className='flex gap-4 mb-7'>
              <input
                
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                type="text"
                placeholder='First name'
                name="first_name"
                value = {values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {
                touched.first_name && errors.first_name && (
                  <div className='error'>{errors.first_name}</div>
                )
              }
              <input
                
                className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                type="text"
                placeholder='Last name'
                name="last_name"
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {
                touched.last_name && errors.last_name && (
                  <div className='error'>{errors.last_name}</div>
                )
              }
            </div>

            <h3 className='text-lg font-medium mb-2'>What's your email</h3>
            <input
              
              
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              type="email"
              placeholder='email@example.com'
              name="email"
              value = {values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete='username'
            />
            {
              touched.email && errors.email && (
                <div className='error'>{errors.email}</div>
              )
            }

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
              name="password"
              value = {values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete ="current-password"
            />
            {
              touched.password && errors.password && (
                <div className='error'>{errors.password}</div>
              )
            }
            <button type='submit'
              className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
              disabled={loading}>{loading ? <Spinner /> : 'Create account'}</button>

          </Form>
          )}
          </Formik>
          <p className='text-center'>Already have a account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
        </div>
        <div>
          <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
      </div>
    </div >
    )
}

export default UserSignup;