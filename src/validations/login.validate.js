import * as Yup from 'yup'

export const  loginValidation = Yup.object().shape({
    
    email     : Yup.string().email('Please enter a valid email').required('The email field is required'),
    password  : Yup.string().required('The password field is required'),
});