import { createSlice } from '@reduxjs/toolkit'
// import { setClientToken } from '../../services/APIKit';
import { clearLocalStorage } from '../../services/storage';
import * as asyncThunks from './async';

console.log("authSlice loaded");

const initialState = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
};




const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    LOGOUT: (state) => {
      clearLocalStorage();
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(asyncThunks.loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncThunks.loginThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload.user;
        state.userToken = payload.token;
        //setClientToken();
      })
      .addCase(asyncThunks.loginThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });


      builder
      .addCase(asyncThunks.registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncThunks.registerThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        
      })
      .addCase(asyncThunks.registerThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  }
});

export const { LOGOUT } = authSlice.actions;
export default authSlice.reducer;
