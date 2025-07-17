import axios from 'axios';
import {API_BASE_URL} from '../utils/const/API';
import { PARAMS } from '../utils/const/Global';
import { clearLocalStorage} from './storage';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../reducers/auth/authSlice';
//port { store } from '../reducers';

// Create axios client, pre-configured with baseURL
let APIKit = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {

      'Content-Type': 'application/json',
    },
});


// Set JSON Web Token in Client to be included in all calls
export const setClientToken = token => {
    APIKit.interceptors.request.use(async config => {
        try 
        {
            const localToken = localStorage.getItem(PARAMS.STORAGE_TOKEN_KEY);
            if (localToken) 
            {
              config.headers.Authorization = `Bearer ${localToken}`;
            }
        } 
        catch (error) 
        {
          console.log('>>>> Token error: ', error);
        }
       return config;
    });

    APIKit.interceptors.response.use(async (response) => {
      return response
    }, async function (error) {
      const originalRequest = error.config;
      
      if (error.response.data.code === 401 && !originalRequest._retry) 
      {
        clearLocalStorage();
        
       // store.dispatch(LOGOUT());

      }else
      {
        return error.response;
      }
    });
};

export default APIKit;