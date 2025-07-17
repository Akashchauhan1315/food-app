import * as Yup from 'yup'

export const  registerSchema = Yup.object().shape({
    first_name     : Yup.string().required('The first name field is required'),
    last_name      : Yup.string().required('The last name field is required'),
    email          : Yup.string().email('Please enter a valid email').required('The email field is required'),
    password       : Yup.string().required('The password field is required'),
    phone          : Yup.string().required('The phone field is required').matches(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
});