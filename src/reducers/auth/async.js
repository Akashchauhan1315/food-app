import { createAsyncThunk } from '@reduxjs/toolkit';
import { PARAMS } from '../../utils/const/Global';
import APIService from '../../services/APIService';

export const loginThunk = createAsyncThunk(
  'user/login',
  async (payload, { rejectWithValue }) => {
    try {
      const user = await new APIService().login(payload);
      if (user?.data?.token) {
        localStorage.setItem(PARAMS.STORAGE_TOKEN_KEY, user.data.token);
      }
      return user.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const registerThunk = createAsyncThunk(
  'user/register',
  async (payload, { rejectWithValue }) => {
    
    try {
      const user = await new APIService().userRegister(payload);
      if (user?.data?.token) {
        localStorage.setItem(PARAMS.STORAGE_TOKEN_KEY, user.data.token);
      }
      return user.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const loginFacebookThunk = createAsyncThunk(
  'user/facebookLogin',
  async (payload, { rejectWithValue }) => {
    try {
      const user = await new APIService().facebooklogin(payload);
      if (user?.data?.token) {
        localStorage.setItem(PARAMS.STORAGE_TOKEN_KEY, user.data.token);
      }
      return user.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
