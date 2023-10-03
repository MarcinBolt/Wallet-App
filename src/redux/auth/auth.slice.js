import { createSlice } from '@reduxjs/toolkit';
import {
  logIn,
  logOut,
  refreshUser,
  register,

  verify,
} from './auth.operations.js';

const initialState = {
  user: { firstName: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: true,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.user.isVerified = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { firstName: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isModalLogoutOpen = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.message;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.message;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.message;
      });
  },
});

export const authReducer = authSlice.reducer;
